const AuthorModel = require("../models/authorModel");
const {isValidName,isValidPassword,isValidEmail}=require("../validators/validation");
const jwt=require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    const data = req.body;

    let {fname, lname, title,email,password} = data
    // IF NO DATA IS PRESENT IN BODY
    if(Object.keys(data).length===0) return res.status(400).send({status:false,msg:"put some data to update"})
    //IF ANY OF THE FIELD IS MISSING-------------------------------------------------
    if(!fname)  return res.status(400).send({status : false,msg : "cannot create author,first name is required"})
    let validfName=isValidName(fname);
    if(!validfName) return res.status(400).send("FirstName should have letters only");


    if(!lname) return res.status(400).send({status : false,msg : "cannot create author,last name is required"})
    let validlName=isValidName(lname);
    if(!validlName) return res.status(400).send("LastName should have letters only");

    if(!title) return res.status(400).send({status : false,msg : "cannot create author,title is required"})
     const titleEnum=["Mr", "Mrs", "Miss"]
      if(!titleEnum.includes(title)) return res.status(400).send({status : false,msg : "title can only contain Mr,Mrs or Miss"})


    if(!email) return res.status(400).send({status : false,msg : "cannot create author, email is required"})
    let validEmail=isValidEmail(email)
    if(!validEmail) return res.status(400).send({status:false,msg:"Enter a valid email"});


    if(!password) return res.status(400).send({status : false,msg : "cannot create author,password is required"})
    let validPassword=isValidPassword(password)
    if(!validPassword) return res.status(400).send({status:false,msg:"password should contain special character,OneUppercase , lowercase and numbers "})

    
  

   

 
   

    
    //IF ALL THE FIELDS ARE PROVIDED THEN CREATING THE AUTHOR----------------------------------------
    const authorData = await AuthorModel.create(data);
     return res.status(201).send({data: authorData});
  } 
  catch (err) {
    return res.status(500).send({ status: false, msg: err.message });
  }
};



const getAuthor = async function (req, res) {
  try
 { 
  const data = await AuthorModel.find();
   return res.status(200).send({data : data});
}
 catch(err){
   return res.status(500).send({status:false,msg:err.message})
  }
};
 
// login 
const authorLogin=async function(req,res){
  try {
   let {email,password}=req.body
 
   //IF DATA IS NOT PROVIDED IN THE REQ BODY--------------------------------
   if(!email && !password) return res.status(400).send({status: false, msg :"please provide email and password to login"})
 
   //IF ONE OF THE FIELDS IS MISSING----------------------------------------------
   if (!email)  return res.status(400).send({status: false, msg :"email is required to login"})
   if (!password)  return res.status(400).send({status: false, msg :"password is required to login"})

   let validEmail=isValidEmail(email)
   if(!validEmail) return res.status(400).send({status: false, msg :"Enter a valid email"});

   let validPassword=isValidPassword(password)
   if(!validPassword) return res.status(400).send({status: false, msg :"Enter a valid password "})
 
   //IF DETAILS ARE POVIDED THEN CHECKING IF THE DETAILS ARE CORRECT OR NOT---------------------
   let authorData= await AuthorModel.findOne({email:email,password:password})
 
   //IF DETAILS NOT CORRECT-------------------------------------------------------
   if(!authorData) return res.status(404).send({status:false,msg:"Enter valid Details"})
   
   //IF DETAILS ARE CORRECT THEN CREATING THE TOKEN------------------------------------------------
   const token= jwt.sign({
   authorId:authorData._id.toString(),
   team: "4 members"
   },
   "project1group1"
   )
   
   return res.status(200).send({status:true,data:token})
   }catch(error){
 return res.status(500).send({msg:error.message})
 
   }
 }

 module.exports={createAuthor,getAuthor, authorLogin};

