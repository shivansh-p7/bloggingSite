const AuthorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    const data = req.body;
    let {fname, lname, title,email,password} = data

    //IF ANY OF THE FIELD IS MISSING-------------------------------------------------
    if(!fname) return res.status(400).send({status : false,msg : "cannot create author,fname is required"})
    if(!lname) return res.status(400).send({status : false,msg : "cannot create author,lname is required"})
    if(!title) return res.status(400).send({status : false,msg : "cannot create author,title is required"})
    if(!email) return res.status(400).send({status : false,msg : "cannot create author, email is required"})
    if(!password) return res.status(400).send({status : false,msg : "cannot create author,password is required"})

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

module.exports.createAuthor = createAuthor;
module.exports.getAuthor = getAuthor;
