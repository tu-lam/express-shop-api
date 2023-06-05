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

exports.getOrder = catchAsync(async (req, res, next) => {
  const order = await Order.findById(req.params.id)
    .populate("items")
    .populate({
      path: "items",
      populate: {
        path: "product",
        model: "Product",
      },
    });

  if (!order) {
    return next(new AppError(404, "No order found with that ID"));
  }

  if (req.user.role !== "admin" && order.user.toString() !== req.user.id) {
    return next(new AppError(401, "Unauthorized"));
  }

  res.status(200).json({
    status: "success",
    data: {
      order,
    },
  });
});

exports.createOrder = catchAsync(async (req, res, next) => {
  const { address, phone } = req.body;

  const user = await User.findById(req.user.id)
    .select("+cart")
    .populate("cart")
    .populate({
      path: "cart",
      populate: {
        path: "product",
        model: "Product",
      },
    });
  console.log(user.cart);

  const total = user.cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.product.price * currentItem.quantity;
  }, 0);

  if (user.cart.length === 0) {
    return next(new AppError(404, "Required item in cart to order."));
  }

  const order = await Order.create({
    user: user.id,
    address,
    phone,
    items: user.cart,
    total,
  });

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
