const factory = require("../utils/handlerFactory");
const catchAsync = require("../utils/catchAsync");
const ApiFeatures = require("../utils/apiFeatures");
const Notification = require("../models/notificationModel");

exports.getAllNotifications = catchAsync(async (req, res, next) => {
  const features = new ApiFeatures(Notification.find({}), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();

  const documents = await features.query;

  res.status(200).json({
    status: "success",
    results: documents.length,
    data: {
      notifications: documents,
    },
  });
});

exports.getNotification = catchAsync(async (req, res, next) => {
  const document = await Notification.findById(req.params.id);

  if (!document) {
    return next(new AppError(404, `No notification found with that ID`));
  }
  res.status(200).json({
    status: "success",
    data: {
      notification: document,
    },
  });
});

exports.createNotification = catchAsync(async (req, res, next) => {
  const newDocument = await Notification.create(req.body);

  res.status(201).json({
    status: "success",
    data: {
      notification: newDocument,
    },
  });
});

exports.updateNotification = catchAsync(async (req, res, next) => {
  const document = await Notification.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
      runValidator: true,
    }
  );

  if (!document) {
    return next(new AppError(404, `No notification found with that ID`));
  }

  res.status(200).json({
    status: "success",
    data: {
      notification: document,
    },
  });
});

exports.deleteNotification = factory.deleteOne(Notification);
