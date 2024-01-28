const express = require("express");
const cors = require("cors");

const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const BlogRouter = require(`${__dirname}/routes/BlogRoutes.js`);
const UserRouter = require(`${__dirname}/routes/UserRoutes.js`);

const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("public"));

const corsOptions = {
  origin: "*",
  credentials: true, //access-control-allow-credentials:true
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/blogs", BlogRouter);
app.use("/api/v1/users", UserRouter);

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
