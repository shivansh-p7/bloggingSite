const { Router } = require("express")
const express = require("express")
const router = express.Router()
const AuthorController = require("../controllers/authorController")
const BlogController= require("../controllers/blogController")

router.get("/test-me", (req, res)=> {
    res.send("hii i am anjali")
})


//CREATING AUTHOR------------------------------
router.post("/author", AuthorController.createAuthor)

//GETTING AUTHOR---------------------------------------

router.get("/authors", AuthorController.getAuthor)

//CREATING BLOG------------------------------------------

router.post("/blog", BlogController.createBlog)

//GETTING BLOG---------------------------------------------------

<<<<<<< HEAD
router.get("/blog", BlogController.getBlog)
router.delete("/blogs/:blogId", BlogController.deleteBlog)
router.delete("/blogs", BlogController.deleteBlogByFilter)



=======
router.get("/blog", BlogController.filterData)

router.put("/blogs/:blogId",BlogController.upddateblog)
>>>>>>> 346ca1d048062dfe50ca9db1d1dd60f98494f21e

module.exports= router