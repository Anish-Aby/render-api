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

// const newBlog = new Blog({
//   author: "Anish Aby",
//   date: "December 02, 2023",
//   title: "Hashnode's Feed Architecture",
//   body: "We previously explained how we calculate the Hashnode Feed and select content and metadata for each user. We found that the feed now displays improved and personalized content. However, we did find two issues in the implementation",
//   category: "Technology",
//   isFeatured: true,
//   image: "./../public/images/hashnode-feed.webp",
//   likes: 0,
//   comments: [{ body: "Amazing content!", date: Date.now() }],
// });
