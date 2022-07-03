const factory = require("../utils/handlerFactory");
const Review = require("../models/reviewModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");

exports.setTourUserIds = (req, res, next) => {
  if (!req.body.tour) req.body.tour = req.params.productId;
  if (!req.body.user) req.body.user = req.user.id;
  next();
};

exports.getAllReviews = catchAsync(async (req, res, next) => {
  let filter = {};
  if (req.params.productId) filter = { product: req.params.productId };

  const features = new ApiFeatures(Model.find(filter), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const reviews = await features.query;

  res.status(200).json({
    status: "success",
    results: reviews.length,
    data: {
      reviews,
    },
  });
});
exports.getReview = factory.getOne(Review);
exports.createReview = factory.createOne(Review);
exports.updateReview = factory.updateOne(Review);
exports.deleteReview = factory.deleteOne(Review);
