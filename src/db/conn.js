const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://brijesh122004:Kk0xKqd2644TtOk6@cluster0.zxivjlh.mongodb.net/?retryWrites=true&w=majority/AddNotes",{
    useNewUrlParser:true
}).then(()=>{
    console.log("Connection Successfull");
}).catch(()=>{
    console.log("no connection");
})
// EAyyLql1FzrnyslF