const express = require("express");
const fs = require("fs");

const BlogRouter = require(`${__dirname}/routes/BlogRoutes.js`);
// const UserRouter = require(`${__dirname}/routes/userRoutes.js`);

const app = express();
const morgan = require("morgan");

app.use(express.json());
app.use(express.static("public"));

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.use("/api/v1/blogs", BlogRouter);
// app.use("/api/v1/users", UserRouter);

module.exports = app;
