const mongoose = require("mongoose")
const email=require("mongoose-type-email")

const isValidName = function (name) {
    const nameRegex = /^[a-zA-Z]+$/;
    return nameRegex.test(name)
}

const isValidPassword = function (password) {
    const passwordRegex=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/
    return passwordRegex.test(password);
};
const isValidEmail=function(email){
    const pattern = /(^$|^.*@.*\..*$)/
    return  pattern.test(email)
}

module.exports.isValidName=isValidName;
module.exports.isValidPassword=isValidPassword;
module.exports.isValidEmail=isValidEmail;