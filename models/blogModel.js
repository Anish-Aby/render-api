const mongoose = require("mongoose");
const slugify = require("slugify");

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

// blogSchema.pre("save", function (next) {
//   this._id = slugify(this.title, {
//     remove: /[*+~.()'"!:@]/g,
//     strict: true,
//     lower: true,
//     trim: true,
//   });
// });

// blogSchema.post("save", function (doc, next) {
//   console.log("will save...");
// });

const Blog = mongoose.model("Blog", blogSchema);

module.exports = Blog;
