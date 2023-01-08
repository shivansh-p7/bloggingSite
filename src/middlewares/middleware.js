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


module.exports={headerValidator,authentication};




 