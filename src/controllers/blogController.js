const BlogModel = require("../models/blogModel")
const mongoose = require("mongoose")

const createBlog = async function (req, res) {
    try {
        const data = req.body
        const allData = await BlogModel.create(data)
        return res.send(allData)
    }
    catch (err) {
        return res.send({ status: false, msg: err.message })
    }
}


const filterData = async function (req, res) {
    try {
        let query = req.query
        if (Object.keys(req.query).length == 0) {
        let getData = await BlogModel.find({ isDeleted: false, isPublished: true }).populate("authorId")
        if (!getData) res.status(404).send("Documents not found")

            return res.status(200).send(getData)

        }

        else {
            let findData = await BlogModel.find({ ...query }).populate("authorId");
            if(findData.length==0) return res.status(404).send({msg:"Data not found"});
            console.log(findData);
            if (!findData) res.status(200).send({ msg: allData });
            return res.status(200).send({ msg: findData });
        }
    }
    catch (err) {
        return res.status(500).send({ status: "Error", error: err.message });
    }
}


module.exports.createBlog = createBlog;
module.exports.filterData = filterData;
 