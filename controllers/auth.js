const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const Users = require('../models/userModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');

const signToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
  return token;
};

const createSendToken = (user, res, statusCode) => {
  const payload = { id: user._id, email: user.email };
  const token = signToken(payload);

  const cookieOptions = {
    httpOnly: true,
    expiresIn: process.env.COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000,
    secure: true,
  };

  user.password = undefined;
  return res
    .cookie('jwt', token, cookieOptions)
    .status(200)
    .json({ status: 'Success', msg: 'Authentication successful' });
};

const signup = catchAsync(async (req, res, next) => {
  const newUser = await Users.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    role: req.body.role,
  });
  console.log('You signed up!');
  createSendToken(newUser, res, 201);
});

const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError('Please provide an email and password'));
  }

  const user = await Users.findOne({ email }).select('+password');

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Invalid email or passowrd', 401));
  }
  createSendToken(user, res, 200);
});

const protect = catchAsync(async (req, res, next) => {
  var token;

  if (req.cookies['jwt']) {
    token = req.cookies['jwt'];
  }

  if (!token) {
    return next(
      new AppError('You are not logged in. Please login to get access', 401)
    );
  }

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  const currUser = await Users.findById(decoded.id);
  if (!currUser) {
    return next(new AppError('User belonging to this token no longer exists'));
  }

  if (currUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError(
        'User recently changed password. Please login again to gain access',
        400
      )
    );
  }
  req.user = currUser;
  next();
});

const restrictTo =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(
          'You do not have the permission to perform this action',
          403
        )
      );
    }
    next();
  };

module.exports = {
  signup,
  login,
  logout,
  protect,
  restrictTo,
};
