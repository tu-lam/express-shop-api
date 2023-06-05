const mongoose = require("mongoose");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Item = require("../models/itemModel");
const User = require("../models/userModel");
const { filterObject } = require("../utils/helper");

exports.getAllItemsInCart = catchAsync(async (req, res, next) => {
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
      items: user.cart,
    },
  });
});

exports.createItemInCart = catchAsync(async (req, res, next) => {
  const { product, quantity, option } = req.body;

  const currentUserPopulateProduct = await req.user.populate({
    path: "cart",
    populate: {
      path: "product",
      model: "Product",
    },
  });

  const existedItem = currentUserPopulateProduct.cart.find(
    (item) => item.product.id == product && item.option == option
  );

  let item;

  if (existedItem) {
    const updatedQuantity = Number(existedItem.quantity) + Number(quantity);
    item = await Item.findByIdAndUpdate(
      existedItem.id,
      { quantity: updatedQuantity },
      {
        new: true,
        runValidator: true,
      }
    );
  } else {
    item = await Item.create({
      product,
      quantity,
      option,
    });

    await User.findByIdAndUpdate(req.user.id, { $push: { cart: item.id } });
  }

  res.status(201).json({
    status: "success",
    data: {
      item,
    },
  });
});

exports.updateItemInCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const itemInCart = req.user.cart.includes(id);

  if (!itemInCart) {
    return next(new AppError(404, `No item found with that ID`));
  }

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

exports.deleteItemInCart = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const itemInCart = req.user.cart.includes(id);

  if (!itemInCart) {
    return next(new AppError(404, `No item found with that ID`));
  }

  await User.findByIdAndUpdate(
    req.user.id,
    {
      $pull: { cart: id },
    },
    { new: true }
  );

  await Item.findByIdAndDelete(id);

  res.status(204).json({ status: "success", data: null });
});
