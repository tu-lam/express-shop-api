const bcrypt = require("bcrypt");
const crypto = require("crypto");
const passport = require("passport");
const jwt = require("jsonwebtoken");

const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const sendEmail = require("../utils/email");

const User = require("../models/userModel");
const { getPrivateKey } = require("../utils/key");

const signToken = (id) => {
  const payload = {
    id,
    // iat: Date.now(),
  };

  const token = jwt.sign(payload, getPrivateKey(), {
    expiresIn: process.env.JWT_EXPIRES_IN,
    algorithm: "RS256",
  });

  return token;
};

const createSendToken = (user, statusCode, req, res) => {
  const token = signToken(user.id);

  res.cookie("jwt", token, {
    // origin: "http://localhost:3000/",
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    // req.headers["x-forwarded-proto"] for heroku
    secure: req.secure || req.headers["x-forwarded-proto"],
    // secure: req.secure,
  });

  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const { name, email, password, confirmPassword } = req.body;

  const newUser = await User.create({
    name,
    email,
    password,
    confirmPassword,
  });

  createSendToken(newUser, 201, req, res);
});

exports.signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError(400, "Please provide email and password!"));
  }

  const user = await User.findOne({ email }).select("+password");

  //fail user or fail password
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return next(new AppError(404, "Incorrect username or password"));
  }
  createSendToken(user, 200, req, res);
});

exports.logout = (req, res) => {
  res.cookie("jwt", "loggedout", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: "success" });
};

exports.protect = passport.authenticate("jwt", { session: false });

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError(401, "You do not have permission to perform this action")
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on POSTed email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError(404, "There is no user with email address."));
  }

  // 2) Generate the random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  // 3) Send it to user's email
  const resetURL = `${req.protocol}://${req.get(
    "host"
  )}/api/v1/users/resetPassword/${resetToken}`;

  const message = `Forgot your password? Submit a PATCH request with your new password and confirm password to: ${resetURL}.\nIf you didn't forget your password, please ignore this email!`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Your password reset token (valid for 10 min)",
      message,
    });

    res.status(200).json({
      status: "success",
      message: "Token sent to email!",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError(
        500,
        "There was an error sending the email. Try again later!"
      )
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  // 1) Get user based on the token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  // 2) If token has not expired, and there is user, set the new password
  if (!user) {
    return next(new AppError(400, "Token is invalid or has expired"));
  }

  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save();

  // 3) Update changedPasswordAt property for the user
  // 4) Log the user in, send JWT
  createSendToken(user, 200, req, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  // 1) Get user from collection
  const user = await User.findById(req.user.id).select("+password");

  // 2) Check if POSTed current password is correct
  const compareResult = await bcrypt.compare(
    req.body.currentPassword,
    user.password
  );

  if (compareResult == false) {
    return next(new AppError(401, "Your current password is wrong."));
  }

  // 3) If so, update password
  user.password = req.body.password;
  user.confirmPassword = req.body.confirmPassword;

  // User.findByIdAndUpdate will NOT work as intended!
  await user.save();

  // 4) Log user in, send JWT
  createSendToken(user, 200, req, res);
});
