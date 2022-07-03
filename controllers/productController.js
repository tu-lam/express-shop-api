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

exports.updateProduct = factory.updateOne(Product);
exports.deleteProduct = factory.deleteOne(Product);
