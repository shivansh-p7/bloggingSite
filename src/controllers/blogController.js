const BlogModel = require("../models/blogModel")


const createBlog = async function(req, res){
        try{
            const data = req.body
            const allData = await BlogModel.create(data)
            res.send(allData)
            }
            catch(err){
                res.send({status: false, msg : err.message})
            }   
 }

 const getBlog  = async function(req, res){
    try {
        let data = await BlogModel.find().populate("authorId")
        res.send(data)
    }
    catch(err) {
        res.send({status: false, msg : err.message})
    }
 }

 module.exports.createBlog = createBlog
 module.exports.getBlog = getBlog
