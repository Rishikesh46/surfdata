const express = require("express");
const {
  getAllBlogs,getBlogbyId,createBlog,verifyPostRequest,updateBlog, deleteBlog,
} = require("../controllers/blogController");

const router = express.Router();
router.route("/surfboard").get(getAllBlogs);
// router.route("/create").post(verifyPostRequest, createBlog);
// router.route("/blog/:id").get(getBlogbyId);
// router.route("/update/:id").post(updateBlog);
// router.route("/delete/:id").post(deleteBlog);
module.exports = router;
