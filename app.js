require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const mongoose = require("mongoose");
const passport = require("passport");
const passportJwt = require("passport-jwt");
const ExtractJwt = require("passport-jwt").ExtractJwt;
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

const AppError = require("./utils/appError");

const globalErrorHandler = require("./controllers/errorController");
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRoutes");
const cartRouter = require("./routes/cartRoutes");
const orderRouter = require("./routes/orderRoutes");
const categoryRouter = require("./routes/categoryRoutes");
const notificationRouter = require("./routes/notificationRoutes");

const User = require("./models/userModel");
const { getPublickey } = require("./utils/key");

const app = express();

app.use(cors());

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

mongoose
  .connect(process.env.DATABASE_URL)
  .then(() => console.log("Database connection successfully!"));

const cookieExtractor = function (req) {
  let token = null;
  if (req && req.cookies) token = req.cookies["jwt"];
  return token;
};

const options = {
  jwtFromRequest: ExtractJwt.fromExtractors([
    ExtractJwt.fromAuthHeaderAsBearerToken(),
    cookieExtractor,
  ]),
  secretOrKey: getPublickey(),
  algorithm: ["RS256"],
};

const strategy = new passportJwt.Strategy(options, (payload, done) => {
  User.findById(payload.id)
    .then((user) => {
      if (!user) {
        const errMessage =
          "The user belonging to this token does no longer exist.";
        const customErr = new AppError(401, errMessage);
        return done(customErr, false);
      }

      if (user.changedPasswordAfter(payload.iat)) {
        const errMessage =
          "User recently changed password! Please log in again.";
        const customErr = new AppError(401, errMessage);
        return done(customErr, false);
      }

      return done(null, user);
    })
    .catch((err) => done(err, false));
});

passport.use(strategy);

app.use(passport.initialize());

const swaggerSpec = swaggerJsDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Shop API",
      version: "1.0.0",
      description: "This is a REST API application made with Express.",
    },
    servers: [
      {
        url: "https://express-shop-api.tulam.xyz/api/v1",
        description: "Deploy server",
      },
      {
        url: "http://127.0.0.1:4000/api/v1",
        description: "Development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          in: "header",
          bearerFormat: "JWT",
        },
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "jwt",
        },
      },
    },
  },
  apis: ["./routes/*.js"],
});

app.use("/api/v1/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api/v1/users", userRouter);
app.use("/api/v1/products", productRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/orders", orderRouter);
app.use("/api/v1/categories", categoryRouter);
app.use("/api/v1/notifications", notificationRouter);

app.all("*", (req, res, next) => {
  next(new AppError(404, `Can't find ${req.originalUrl} on this server!`));
});

app.use(globalErrorHandler);

module.exports = app;
