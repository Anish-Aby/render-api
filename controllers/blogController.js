const Blog = require("./../models/blogModel");

// get all blogs
exports.getAllBlogs = async (req, res) => {
  const blogs = await Blog.find();
  res.status(200).json({
    status: "success",
    results: blogs.length,
    data: {
      blogs,
    },
  });
};

// get blog by id
exports.getBlogById = async (req, res) => {
  const blogId = req.params.blogId;
  const blog = await Blog.findById(blogId);

  if (blog) {
    res.status(200).json({
      status: "success",
      blog,
    });
  } else {
    res.status(404).json({
      status: "error",
      data: "Blog not found",
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

  // make new blog obj
  const newBlog = new Blog({
    _id: blogId,
    authorId: requestBody.authorId,
    date: requestBody.date,
    title: requestBody.title,
    image: requestBody.image,
    body: requestBody.body,
    category: requestBody.category,
    isFeatured: true,
  });

  // save newBlog
  await newBlog.save();

  res.status(201).json({
    status: "success",
  });
};
