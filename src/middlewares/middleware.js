const jwt=require("jsonwebtoken")


const headerValidator= async function(req,res,next){
try{let token=req.headers["x-api-key"]
if(!token) return res.status(404).send({status:false,msg:"token is required"})

next()
}
catch(error){
return res.status(500).send({status:false,err:error.message})


}

}

const authentication= async function(req,res,next){
 try {  
    let token=req.headers["x-api-key"]
let decodedToken= jwt.verify(token,"project1group1")
req.decodedToken=decodedToken
next()
}
catch(error){
    return res.status(500).send({status:false,err:error.message})
}
}


// const authorization= async function (req,res,next){
//   try{  
//     let {authorId}=req.params
   

//     if (authorId!=req.decodedToken.authorId) return res.status(400).send({status:false,msg:"You're not authorized to do this action"})

// next()
// }
// catch(error){
//     return res.status(500).send({status:false,err:error.message})
// }

// }
module.exports.headerValidator=headerValidator
module.exports.authentication=authentication




 // const isAuthorBlog= await  BlogModel.findOne({_id:blogId,authorId:authorId})
    // if(!isAuthorBlog) return res.status(400).send({status:false,msg:"invalid 2request"})