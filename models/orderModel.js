const mongoose = require("mongoose");
const Item = require("./itemModel");

const orderSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.ObjectId,
    ref: "User",
    required: [true, "Order must belong to a user."],
  },
  address: {
    type: String,
    required: [true, "A order must have a address"],
  },
  phone: {
    type: String,
    required: [true, "A order must have a phone"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  total: {
    type: Number,
    default: 0,
  },
  status: {
    type: String,
    enum: ["new", "processing", "shipping", "delivered", "canceled"],
    default: "new",
  },
  items: {
    type: [
      {
        type: mongoose.Schema.ObjectId,
        ref: "Item",
      },
    ],
    default: [],
  },
});

module.exports = mongoose.model("Order", orderSchema);
