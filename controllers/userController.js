const multer = require("multer");
const sharp = require("sharp");
const factory = require("../utils/handlerFactory");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");

const { filterObject } = require("../utils/helper");

const multerStorage = multer.memoryStorage();

const multerFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image")) {
    cb(null, true);
  } else {
    cb(new AppError(400, "Not an image! Please upload only images."), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

exports.uploadUserPhoto = upload.single("photo");

exports.resizeUserPhoto = catchAsync(async (req, res, next) => {
  if (!req.file) return next();

  req.file.filename = `user-${req.user.id}-${Date.now()}.jpeg`;

  await sharp(req.file.buffer)
    .resize(500, 500)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/users/${req.file.filename}`);

  next();
});

// exports.getMe = catchAsync(async (req, res, next) => {
//   req.params.id = req.user.id;
//   next();
// });

exports.getMe = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError(404, `No user found with that ID`));
  }
  res.status(200).json({
    status: "success",
    data: {
      user,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  const { password, passwordConfirm } = req.body;

  // 1) Create error if user POSTs password data
  if (password || passwordConfirm) {
    return next(
      new AppError(
        400,
        "This route is not for password updates. Please use /update-my-password."
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObject(req.body, "name", "email", "photo");
  if (!filteredBody.name) {
    delete filteredBody.name;
  }
  filteredBody.photo = req.file.filename;

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);

// exports.createUser = factory.createOne(User);
// exports.updateUser = factory.updateOne(User);
// exports.deleteUser = factory.deleteOne(User);
