const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(require('./router/auth'));

require("./db/conn");

// app.get("/",(req, res)=>{
//     res.send("home page");
// })

app.listen(PORT , ()=>{
    console.log(`listening on the port number ${PORT}`);
})