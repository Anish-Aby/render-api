const Blog = require("./../models/blogModel");

const { convert } = require("html-to-text");

// get all blogs
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.status(200).json({
      status: "success",
      results: blogs.length,
      data: {
        blogs,
      },
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// get blog by id
exports.getBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    const blog = await Blog.findById(blogId);
    res.status(200).json({
      status: "success",
      blog,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// create blog
exports.createBlog = async (req, res) => {
  // access req body
  const requestBody = req.body;
  let blogId;

  // remove special characters from title for blog-id
  if (requestBody.title) {
    const removeQuote = requestBody.title.replace(/[']+/g, "");
    const title = removeQuote.replace(/[^a-zA-Z0-9]+/g, " ").trim();
    blogId = title.toLowerCase().split(" ").join("-");
  }

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

  try {
    await newBlog.save();
    res.status(201).json({
      status: "success",
      data: newBlog,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// update blogs
exports.updateBlog = async (req, res) => {
  try {
    const blogId = req.params.blogId;
    const body = req.body;
    const blog = await Blog.findByIdAndUpdate(blogId, body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: blog,
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};

// delete blog
exports.deleteBlog = async (req, res) => {
  const blogId = req.params.blogId;
  try {
    await Blog.findByIdAndDelete(blogId);

    res.status(200).json({
      status: "success",
      data: "Blog deleted successfully",
    });
  } catch (err) {
    res.status(404).json({
      status: "error",
      message: err,
    });
  }
};
