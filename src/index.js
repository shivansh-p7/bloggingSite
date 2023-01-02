const express = require("express")
const {default : mongoose} = require("mongoose")
const bodyParser = require("body-parser")
const app = express()


//CONNECTING WITH THE MONGODB----------------------------------------

mongoose.connect("mongodb+srv://Bhavi:Bhavi123@cluster1.yydegcy.mongodb.net/group1Database", {
    useNewUrlParser : true
}).then(()=>console.log("MongoDB is connected"))
.catch(err=> console.log(err))


//TESTING-----------------------------------------------------------

app.get("/", (req,res)=>{
    res.send("hi i am api")
})


//CONNECTING WITH THE SERVER----------------------------------------

app.listen(process.env.PORT || 3000, ()=> {
    console.log(`Server is running on port ${process.env.PORT || 3000}`)
})