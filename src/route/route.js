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

router.get("/blog", BlogController.filterData)

module.exports= router