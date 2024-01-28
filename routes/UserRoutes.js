const express = require("express");
const userController = require(`${__dirname}/../controllers/userController`);
const authController = require(`${__dirname}/../controllers/authController`);

const router = express.Router();

router.post("/signup", authController.signup);

router.route("/:userId").get(userController.getUser);

module.exports = router;
