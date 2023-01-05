const { Router } = require("express");
const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const BlogController = require("../controllers/blogController");
const {headerValidator,authentication}=require("../middlewares/middleware")
router.get("/test-me", (req, res) => {
  res.send("hii i am anjali");
});

//CREATING AUTHOR------------------------------
router.post("/authors",AuthorController.createAuthor);

//GETTING AUTHOR---------------------------------------
router.get("/authors", AuthorController.getAuthor);

//CREATING BLOG------------------------------------------
router.post("/blogs",headerValidator,authentication, BlogController.createBlog);

//GETTING BLOG---------------------------------------------------
router.get("/blogs",headerValidator,authentication,BlogController.filterData);

//UPDATE BLOG
router.put("/blogs/:blogId",headerValidator,authentication,BlogController.upddateblog);

//DELETE BLOG
router.delete("/blogs/:blogId", headerValidator,authentication,BlogController.deleteBlog);
router.delete("/blogs",headerValidator,authentication, BlogController.deleteBlogByFilter);

//AUTHOR LOGIN
router.post("/login",AuthorController.authorLogin)

module.exports = router;
