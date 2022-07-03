const catchAsync = require("../utils/catchAsync");
// const AppError = require("../utils/appError");

const User = require("../models/userModel");

exports.getCart = catchAsync(async (req, res, next) => {
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

  return res.status(200).json({
    status: "success",
    results: user.cart.length,
    data: {
      cart: user.cart,
    },
  });
});
