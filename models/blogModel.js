const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema({
  _id: {
    type: String,
    required: [true, "blogId is required."],
  },
  authorId: String,
  date: {
    type: String, // change to date
    default: Date.now,
  },
  title: String,
  image: String,
  body: mongoose.Schema.Types.Mixed,
  summary: String,
  category: String,
  comments: {
    type: Array,
    default: [],
  },
  likes: {
    type: Number,
    default: 0,
  },
  isFeatured: Boolean,
});

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
