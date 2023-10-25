const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Users = require('../models/userModel');
const Catalogs = require('../models/catalogModel');
const Order = require('../models/orderModel');

const getAllSellers = catchAsync(async (req, res, next) => {
  const sellers = await Users.find({ role: 'Seller' });

  return res.status(200).json({
    status: 'Success',
    data: {
      sellers,
    },
  });
});

const getAllCatalogs = catchAsync(async (req, res, next) => {
  const sellerId = req.params.seller_id;

  const catalog = await Catalogs.find({ seller: sellerId })
    .populate({
      path: 'products',
      select: 'name price',
    })
    .populate({
      path: 'seller',
      select: 'name email ',
    })
    .select('-__v');

  return res.status(200).json({
    status: 'Success',
    data: {
      catalog,
    },
  });
});

const createOrder = catchAsync(async (req, res, next) => {
  const { seller_id } = req.params;
  const { products } = req.body;

  // const orderProducts = [];

  const newOrder = await Order.create({
    buyer: req.user._id,
    seller: seller_id,
    products,
  });
  return res.status(200).json({
    status: 'Success',
    data: {
      newOrder,
    },
  });
});

module.exports = {
  getAllSellers,
  getAllCatalogs,
  createOrder,
};
