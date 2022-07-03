const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const Order = require("../models/orderModel");
const User = require("../models/userModel");

// exports.getCheckoutSession = catchAsync(async (req, res, next) => {});

exports.getAllOrders = factory.getAll(Order);

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
