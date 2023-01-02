const AuthorModel = require("../models/authorModel");

const createAuthor = async function (req, res) {
  try {
    const data = req.body;
    const allData = await AuthorModel.create(data);
    res.send(allData);
  } catch (err) {
    res.send({ status: false, msg: err.message });
  }
};

const getAuthor = async function (req, res) {
  const data = await AuthorModel.find();
  res.send(data);
};

module.exports.createAuthor = createAuthor;
module.exports.getAuthor = getAuthor;
