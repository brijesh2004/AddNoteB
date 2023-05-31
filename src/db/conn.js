const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/AddNotes",{
    useNewUrlParser:true
}).then(()=>{
    console.log("Connection Successfull");
}).catch(()=>{
    console.log("no connection");
})