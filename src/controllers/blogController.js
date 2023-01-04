const AuthorModel = require("../models/authorModel");
const BlogModel = require("../models/blogModel");
const jwt=require("jsonwebtoken");
const blogModel = require("../models/blogModel");

const createBlog = async function (req, res) {
  try {
    let authorId = req.body.authorId;


    let author = await AuthorModel.findById(authorId);

    if (author) {
      const data = req.body;
      const allData = await BlogModel.create(data);
      res.status(201).send(allData);
    } else {
      res.status(400).send({ status: false, msg: "author does not exist" });
    }
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const filterData = async function (req, res) {
  try {
    let query = req.query;

    if (Object.keys(query).length == 0) {
      let getData = await BlogModel.find({isDeleted: false,isPublished: true,}).populate("authorId");
      if (getData.length==0) res.status(404).send("Documents not found"); return res.status(200).send(getData);
    } 
    else {
      let findData = await BlogModel.find({ ...query }).populate("authorId");
      if (findData.length == 0) return res.status(404).send({ msg: "Data not found" });
     
      return res.status(200).send({ msg: findData });
    }
  } catch (err) {
    return res.status(500).send({ status: "Error", error: err.message });
  }
};

const upddateblog = async function (req, res) {
  try {
    let blogsdata = await BlogModel.findOne({
      _id: req.params["blogId"],
      isDeleted: false,
    });
    if (!blogsdata)
    return res.status(404).send("no documents found with this id");
    //authorization=============
    if (blogsdata.authorId!=req.decodedToken.authorId) return res.status(400).send({status:false,msg:"You're not authorized to do this action"})
    //=====================


    let data = req.body;
    let todaysDate= new Date().toLocaleString()
    let updates = await BlogModel.findOneAndUpdate(
      { _id: req.params["blogId"] },
      {
        body: data["body"],
        $push: {tags: data["tags"]},
          isPublished: true,
          $set: { publishedAt: todaysDate }
        
      },
      { new: true }
    );
    return res.status(200).send({ msg: updates });
  } catch (error) {
    res.status(500).send({error:error.message,msg:"enter a valid Id"});
  }
};


const deleteBlog = async function (req, res) {
  try {
    let blogId= req.params.blogId;
    let data= await  BlogModel.findById(blogId)
    if(!data) return res.status(404).send({status:false,msg:"no documents found with this id"})

  //authorization=============
  if (data.authorId!=req.decodedToken.authorId) return res.status(400).send({status:false,msg:"You're not authorized to do this action"})
  //=====================


    let todaysDate= new Date().toLocaleString()

    const blogData = await BlogModel.findOneAndUpdate(
      { _id: blogId,isDeleted:false },
      { $set: { isDeleted: true , deletedAt: todaysDate,isPublished:false } },
    
      { new: true }
    );
    if (!blogData) return res.status(404).send({ status: false, msg: "invalid request" });
   return  res.status(200).send();
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const deleteBlogByFilter = async function (req, res) {
  try {
    let query = req.query;
    if (Object.keys(query).length === 0 ) return res.status(404).send({ status: false, msg: "invalid request" });
    let data=await blogModel.find({authorId:req.decodedToken.authorId,...query})
   
      if(data.length==0) return res.status(400).send({status:false,msg:"You are not authorized Author"})
  
      let todaysDate= new Date().toLocaleString()
    const blogData = await BlogModel.updateMany(
      { ...query ,isDeleted:false},
      { $set: { isDeleted: true , deletedAt: todaysDate,isPublished:false} },
      { new: true }
    );
    if (!blogData) return res.status(404).send({ status: false, msg: "invalid request" });
   
   return  res.status(200).send();
  } catch (err) {
   return res.status(500).send({ status: false, msg: err.message });
  }
};

const authorLogin=async function(req,res){
 try {let {email,password}=req.body
  
  let authorData= await AuthorModel.findOne({email:email,password:password})
  if(!authorData) return res.status(404).send({status:false,msg:"Enter valid Details"})
  
  const token= jwt.sign({
  authorId:authorData._id.toString(),
  team: "4 members"
  },
  "project1group1"
  )
  
  return res.status(200).send({status:true,msg:token})
  }catch(error){
return res.status(500).send({msg:error.message})

  }
}
module.exports.createBlog = createBlog;
module.exports.filterData = filterData;
module.exports.upddateblog = upddateblog;
module.exports.deleteBlog = deleteBlog;
module.exports.deleteBlogByFilter = deleteBlogByFilter;
module.exports.authorLogin=authorLogin
