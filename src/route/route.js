const { Router } = require("express");
const express = require("express");
const router = express.Router();
const AuthorController = require("../controllers/authorController");
const BlogController = require("../controllers/blogController");
const Middleware=require("../middlewares/middleware")

router.get("/test-me", (req, res) => {
  res.send("hii i am anjali");
});

//CREATING AUTHOR------------------------------
router.post("/authors",AuthorController.createAuthor);

//GETTING AUTHOR---------------------------------------

router.get("/authors", AuthorController.getAuthor);

//CREATING BLOG------------------------------------------

router.post("/blogs",Middleware.headerValidator,Middleware.authentication, BlogController.createBlog);

//GETTING BLOG---------------------------------------------------

router.get("/blogs",Middleware.headerValidator,Middleware.authentication,BlogController.filterData);
//update blog
router.put("/blogs/:blogId",Middleware.headerValidator,Middleware.authentication,BlogController.upddateblog);

// delete blog
router.delete("/blogs/:blogId", Middleware.headerValidator,Middleware.authentication,BlogController.deleteBlog);
router.delete("/blogs",Middleware.headerValidator,Middleware.authentication, BlogController.deleteBlogByFilter);

//authorLogin
router.post("/login",BlogController.authorLogin)

module.exports = router;
