const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, "A product must have a name"],
    unique: true,
  },
  description: String,
  price: {
    type: Number,
    required: [true, "A product must have a price"],
  },
  image: {
    type: String,
    required: [true, "A product must have a image"],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
    min: [1, "Rating must be above 1.0"],
    max: [5, "Rating must be below 5.0"],
    set: (val) => Math.round(val * 10) / 10, // 4.666666, 46.6666, 47, 4.7
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("Product", productSchema);
