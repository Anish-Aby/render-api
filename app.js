const express = require("express");
const cors = require("cors");

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

module.exports = app;
