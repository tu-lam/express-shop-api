const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("../utils/handlerFactory");
const Item = require("../models/itemModel");
const User = require("../models/userModel");
const { filterObject } = require("../utils/helper");

exports.createItem = catchAsync(async (req, res, next) => {
  const { product, quantity, size } = req.body;

  const item = await Item.create({
    product,
    quantity,
    size,
  });

  await User.findByIdAndUpdate(req.user.id, { $push: { cart: item.id } });

  res.status(201).json({
    status: "success",
    data: {
      item,
    },
  });
});

exports.updateItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const itemInCart = req.user.cart.includes(id);

  if (!itemInCart) {
    return next(new AppError(404, `No item found with that ID`));
  }

  // update
  const filteredBody = filterObject(req.body, "quantity");

  const updatedItem = await Item.findByIdAndUpdate(id, filteredBody, {
    new: true,
    runValidator: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      item: updatedItem,
    },
  });
});

exports.deleteItem = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const itemInCart = req.user.cart.includes(id);

  if (!itemInCart) {
    return next(new AppError(404, `No item found with that ID`));
  }

  // delete item in cart
  await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { cart: id },
    },
    { new: true }
  );

  // delete item
  await Item.findByIdAndDelete(id);

  res.status(204).json({ status: "success", data: null });
});
