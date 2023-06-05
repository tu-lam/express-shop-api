const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  category: {
    type: mongoose.Schema.ObjectId,
    ref: "Category",
  },
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
    set: (val) => Math.round(val * 10) / 10,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
});

productSchema.pre(/^find/, function (next) {
  this.populate({
    path: "category",
    model: "Category",
  });
  next();
});

module.exports = mongoose.model("Product", productSchema);
