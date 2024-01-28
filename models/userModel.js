const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "Username is required"],
    unique: true,
  },
  displayName: String,
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    minlength: 8,
  },
  image: String,
  bio: String,
  followers: Array,
  following: Array,
  followingTags: Array,
  achievements: Array,
  blogs: Array,
  bookmarks: Array,
  blockedUsers: Array,
});

const User = mongoose.model("User", userSchema);

module.exports = User;
