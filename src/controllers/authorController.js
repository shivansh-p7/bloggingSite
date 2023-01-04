const AuthorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    const data = req.body;
    const allData = await AuthorModel.create(data);
    res.status(201).send(allData);
  } catch (err) {
    res.status(500).send({ status: false, msg: err.message });
  }
};

const getAuthor = async function (req, res) {
  try
 { 
  const data = await AuthorModel.find();
  res.status(200).send(data);
}

    catch(err){
    res.status(500).send({status:false,msg:err.message})
  }
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthor = getAuthor;
