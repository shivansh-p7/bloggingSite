const mongoose = require("mongoose");
const email = require("mongoose-type-email");

const authorSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
      trim:true
    },
    lname: {
      type: String,
      required: true,
      trim:true
    },
    title: {
      type: String,
      required: true,
      enum: ["Mr", "Mrs", "Miss"],
    },
    email: {
      type: email,
      unique: true,
      required: true,
      trim:true
    },
    password: {
      type: String,
      required: true
     
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Author", authorSchema);
