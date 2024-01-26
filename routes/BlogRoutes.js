const express = require("express");
const blogController = require(`${__dirname}/../controllers/blogController`);

const router = express.Router();

// router param middleware
// router.param("blogId", blogController.checkId);

router
  .route("/")
  .get(blogController.getAllBlogs)
  .post(blogController.createBlog);

router
  .route("/:blogId")
  .get(blogController.getBlogById)
  .patch(blogController.updateBlog)
  .delete(blogController.deleteBlog);

module.exports = router;
