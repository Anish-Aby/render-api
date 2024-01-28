const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

process.on("uncaughtException", (err) => {
  console.log("UNHANDLED EXCEPTION! Shutting down");
  console.log(err);
  process.exit(1);
});

const app = require("./app");

// Getting connectiong string for mongodb
const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

//  mongoose database connection logger
mongoose.connection.on("connected", () =>
  console.log("Database connection successful!")
);
mongoose.connection.on("disconnected", () =>
  console.log("Disconnected from database.")
);
mongoose.connection.on("error", () => {
  console.log("parseError due to malformed data or payload larger than 16MB.");
});

// connecting to the mongodb database
mongoose.connect(DB);

// server listening
const PORT = process.env.PORT || 8000;
const server = app.listen(PORT, () => {
  console.log(`Server is running at port: ${PORT}`);
});

process.on("unhandledRejections", (err) => {
  console.log("UNHANDLED REJECTION! Shutting down");
  console.log(err);
  server.close(() => {
    process.exit(1);
  });
});
