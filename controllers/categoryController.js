const factory = require("../utils/handlerFactory");
const Category = require("../models/categoryModel");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");

exports.getAllCategories = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Category.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const documents = await features.query;

  res.status(200).json({
    status: "success",
    results: documents.length,
    data: {
      categories: documents,
    },
  });
});

exports.getCategory = catchAsync(async (req, res, next) => {
  const document = await Category.findById(req.params.id);

  if (!document) {
    return next(new AppError(404, `No category found with that ID`));
  }
  res.status(200).json({
    status: "success",
    data: {
      category: document,
    },
  });
});

exports.createCategory = catchAsync(async (req, res, next) => {
  const newDocument = await Category.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      category: newDocument,
    },
  });
});

exports.updateCategory = catchAsync(async (req, res, next) => {
  const document = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  if (!document) {
    return next(new AppError(404, `No category found with that ID`));
  }

  res.status(200).json({
    status: "success",
    data: {
      category: document,
    },
  });
});

exports.deleteCategory = factory.deleteOne(Category);
