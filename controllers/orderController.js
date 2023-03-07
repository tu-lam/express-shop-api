const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Order = require("../models/orderModel");
const User = require("../models/userModel");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllOrders = catchAsync(async (req, res, next) => {
  let filterObject = {};

  if (req.user.role == "user") {
    filterObject = { user: req.user.id };
  }

  const features = new ApiFeatures(Order.find(filterObject), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const orders = await features.query;

  res.status(200).json({
    status: "success",
    results: orders.length,
    data: {
      orders,
    },
  });
});

exports.getOrder = catchAsync(async (req, res, next) => {});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { address, phone } = req.body;

  const user = await User.findById(req.user.id).select("+cart");

  if (user.cart.length === 0) {
    return next(new AppError(404, "Required item in cart to order."));
  }

  const order = await Order.create({
    user: user.id,
    address,
    phone,
    items: user.cart,
  });

  // clear cart
  user.cart = [];
  await user.save({ validateBeforeSave: false });

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.updateOrder = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const { status } = req.body;

  const order = await Order.findByIdAndUpdate(
    id,
    {
      status,
    },
    { new: true, runValidators: true }
  );

  res.status(201).json({
    status: "success",
    data: {
      order,
    },
  });
});

//
// exports.getAllProducts = factory.getAll(Product);
// exports.getProduct = factory.getOne(Product);
// exports.createProduct = factory.createOne(Product);
// exports.updateProduct = factory.updateOne(Product);
// exports.deleteProduct = factory.deleteOne(Product);
