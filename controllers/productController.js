const multer = require("multer");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("../utils/handlerFactory");
const Product = require("../models/productModel");

const { filterObject } = require("../utils/helper");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images/products");
  },
  filename: (req, file, cb) => {
    const ext = file.mimetype.split("/")[1];
    cb(null, `product-${req.user.id}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image! Please upload only images."), false);
  }
};

const upload = multer({ storage: multerStorage, fileFilter: multerFilter });

exports.uploadProductImage = upload.single("image");
exports.getAllProducts = factory.getAll(Product);
exports.getProduct = factory.getOne(Product);

exports.createProduct = catchAsync(async (req, res, next) => {
  const filteredBody = filterObject(req.body, "name", "description", "price");
  filteredBody.image = req.file.filename;

  const product = await Product.create(filteredBody);

  res.status(201).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.updateProduct = catchAsync(async (req, res, next) => {
  if (req.file) req.body.image = req.file.filename;

  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidator: true,
  });

  if (!product) {
    return next(new AppError(404, `No product found with that ID`));
  }

  res.status(200).json({
    status: "success",
    data: {
      product,
    },
  });
});

exports.deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);

  if (!product) {
    return next(new AppError(404, `No product found with that ID`));
  }

  if (product.image) await deleteImageFromServer("products", product.image);

  res.status(204).json({
    status: "success",
    data: null,
  });
});
