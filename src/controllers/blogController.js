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

 const deleteBlog=async function(req,res){
try{
let blogId= req.params.blogId
const blogData= await BlogModel.findOneAndUpdate({_id:blogId},{$set:{isDeleted:true}},{new:true})
if(!blogData) return res.status(404).send({status:false,msg:"invalid request"})
res.status(200).send()
}
catch(err){
    res.status(500).send({status: false, msg : err.message})
}

 }

const deleteBlogByFilter= async function(req,res){
try{
    let query=req.query
    if(Object.keys(query).length===0) return res.status(404).send({staus:false,msg:"invalid request"})
const blogData= await BlogModel.findOneAndUpdate({...query},{$set:{isDeleted:true}},{new:true})
console.log(blogData)


res.status(200).send()
}
catch(err){

    res.status(500).send({status: false, msg : err.message})
}

}







 module.exports.createBlog = createBlog
 module.exports.getBlog = getBlog
 module.exports.deleteBlog = deleteBlog
module.exports.deleteBlogByFilter=deleteBlogByFilter
