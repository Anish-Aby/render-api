const Blog = require("./../models/blogModel");
const APIFeatures = require("./../utils/apiFeatures");
const catchAsync = require("./../utils/catchAsync");
const slugify = require("slugify");

const { convert } = require("html-to-text");
const AppError = require("../utils/appError");

// get all blogs
exports.getAllBlogs = catchAsync(async (req, res, next) => {
  const features = new APIFeatures(Blog.find(), req.query)
    .filter()
    .sort()
    .limitFields()
    .paginate();
  const blogs = await features.query;

  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
});

// get blog by id
exports.getBlogById = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  const blog = await Blog.findById(blogId);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    blog,
  });
});

// create blog
exports.createBlog = catchAsync(async (req, res, next) => {
  // access req body
  const requestBody = req.body;
  let blogId = slugify(requestBody.title, {
    remove: /[*+~.()'"!:@]/g,
    strict: true,
    lower: true,
    trim: true,
  });

  // remove special characters from title for blog-id
  // if (requestBody.title) {
  //   const removeQuote = requestBody.title.replace(/[']+/g, "");
  //   const title = removeQuote.replace(/[^a-zA-Z0-9]+/g, " ").trim();
  //   blogId = title.toLowerCase().split(" ").join("-");
  // }

  // make summary
  const blogContent = requestBody.body.content.blocks;
  let summaryArray = [],
    counter = 0;
  for (block of blogContent) {
    if (block.type === "paragraph") {
      summaryArray.push(block.data.text);
      counter++;
    }
    if (counter >= 2) break;
  }

  const converterFormatters = {
    whitespaceCharacters: "",
    selectors: [{ selector: "a", options: { ignoreHref: true } }],
  };

  const summary = convert(summaryArray.join(" "), converterFormatters);

  // make new blog obj
  const newBlog = new Blog({
    _id: blogId,
    authorId: requestBody.authorId,
    date: requestBody.date,
    title: requestBody.title,
    image: requestBody.image,
    body: requestBody.body,
    summary: summary,
    category: requestBody.category,
    isFeatured: requestBody.isFeatured,
  });

  await newBlog.save();
  res.status(201).json({
    status: "success",
    data: newBlog,
  });
});

// update blogs
exports.updateBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  const body = req.body;
  const blog = await Blog.findByIdAndUpdate(blogId, body, {
    new: true,
    runValidators: true,
  });

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: blog,
  });
});

// delete blog
exports.deleteBlog = catchAsync(async (req, res, next) => {
  const blogId = req.params.blogId;
  const blog = await Blog.findByIdAndDelete(blogId);

  if (!blog) {
    return next(new AppError("No blog found with that ID", 404));
  }

  res.status(200).json({
    status: "success",
    data: "Blog deleted successfully",
  });
});
