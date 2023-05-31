const jwt = require("jsonwebtoken");
const Add = require("../model/register");

const authenticate = async (req , res,next)=>{
    try{
        console.log("before tokens");
        const token = req.cookies.jwttoken;
        console.log("after token")
        const varifytoken = jwt.verify(token , "iambrijeshsinghfromgarakhpurkhajani");
        const rootUser = await Add.findOne({_id:varifytoken._id,"tokens.token":token});

        if(!rootUser){
             throw new Error("User Not Found");
        }

        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;

        next();
    }
    catch(err){
        res.status(401).send("Unauthorized : No token Provided");
        console.log(err);
    }
}

module.exports = authenticate;