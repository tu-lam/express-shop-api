const mongoose = require("mongoose");

const itemSchema = mongoose.Schema({
  product: {
    type: mongoose.Schema.ObjectId,
    ref: "Product",
  },
  quantity: { type: Number, default: 1 },
  option: String,
});

module.exports = mongoose.model("Item", itemSchema);
