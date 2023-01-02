const BlogModel = require("../models/blogModel")
const AuthorModel = require("../models/authorModel")


const createBlog = async function(req, res){
        try{
            let authorId = req.body.authorId
            let author = await AuthorModel.findById(authorId)

            if(author){
            const data = req.body
            const allData = await BlogModel.create(data)
            res.status(201).send(allData)
            }
            else {
                res.status(400).send({status: false, msg : "author does not exist"})
            }

            }
            catch(err){
                res.send({status: false, msg : err.message})
            }   
 }

 const getBlog  = async function(req, res){
    try {
        let data = await (await BlogModel.find().populate("authorId")).find({isDeleted: false, isPublished: true})
        res.send(data)
    }
    catch(err) {
        res.send({status: false, msg : err.message})
    }
 }

 module.exports.createBlog = createBlog
 module.exports.getBlog = getBlog
