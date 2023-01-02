const mongoose = require("mongoose")
const ObjectId = mongoose.Schema.Types.ObjectId

const blogSchema = new mongoose.Schema({
  title : {
    type: String,
    required: true
  },
  body :  {
    type: String,
    required: true
  },
  authorId : {
     type : ObjectId,
     ref : "Author"
  },
  tags : [String],
  category :  {
    type: String,
    required: true
  },
  subcategory : [String],
  deletedAt : new Date(),
  isDeleted : {
    type: Boolean,
    default : false
  },
  publishedAt: {
    type : Date ,
    default :new Date()
  },
  isPublished: {
    type: Boolean,
    default : false
  }
}, {timestamps: true})

module.exports = mongoose.model("Blog", blogSchema)