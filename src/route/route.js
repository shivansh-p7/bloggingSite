const { Router } = require("express");
const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const BlogController = require("../controllers/blogController");

router.get("/test-me", (req, res) => {
  res.send("hii i am anjali");
});

//CREATING AUTHOR------------------------------
router.post("/authors", AuthorController.createAuthor);

//GETTING AUTHOR---------------------------------------

router.get("/authors", AuthorController.getAuthor);

//CREATING BLOG------------------------------------------

router.post("/blogs", BlogController.createBlog);

//GETTING BLOG---------------------------------------------------

router.get("/blogs", BlogController.filterData);
//update blog
router.put("/blogs/:blogId", BlogController.upddateblog);

// delete blog
router.delete("/blogs/:blogId", BlogController.deleteBlog);
router.delete("/blogs", BlogController.deleteBlogByFilter);

module.exports = router;
