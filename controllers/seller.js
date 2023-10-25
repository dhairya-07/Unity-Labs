const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/AppError');
const Users = require('../models/userModel');
const Catalogs = require('../models/catalogModel');
const Product = require('../models/productsModel');
const Orders = require('../models/orderModel');

const createCatalog = catchAsync(async (req, res, next) => {
  if (await Catalogs.exists({ seller: req.user._id })) {
    return next(
      new AppError(
        'You already have a catelog! Please make a patch request to xyz route',
        401
      )
    );
  }
  const { products } = req.body;

  const newProducts = await Product.create(products);

  const productIDs = [];
  newProducts.forEach((el) => {
    productIDs.push(el._id);
  });

  const catalog = await Catalogs.create({
    seller: req.user.id,
    products: productIDs,
  });

  return res.status(200).json({
    status: 'success',
    data: {
      seller: req.user.name,
      catalog: catalog,
    },
  });
});

const getAllOrders = catchAsync(async (req, res, next) => {
  const orders = await Orders.find({ seller: req.user._id }).select(
    '-__v -seller'
  );
  return res.status(200).json({
    status: 'Success',
    data: {
      orders,
    },
  });
});

module.exports = { createCatalog, getAllOrders };
