const BlogModel = require("../models/blogModel")
const mongoose=require('mongoose')


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
 //nikithas api
 const upddateblog=async function(req,res){
    try{
    let blogsdata=await BlogModel.find({_id:req.params["blogId"],isDeleted:false});
    console.log(blogsdata)
    if(blogsdata.length==0) return res.status(404).send("no documents found with this id");
    
        let data=req.body;
        let updates=await BlogModel.findOneAndUpdate({_id:req.params["blogId"]},{body:data["body"],$push:{tags:data["tags"],
        isPublished:true,$push:{publishedAt:new Date()}},
        },{new:true});
      
        return res.status(200).send({msg:updates});
           
    
}catch(error){
        res.status(500).send(error.message);
    }




}

 module.exports.createBlog = createBlog
 module.exports.getBlog = getBlog;
 module.exports.upddateblog=upddateblog;
