
const musicModel = require("../models/music.model");

const jwt = require("jsonwebtoken");

async function createMusic(req , res){

    const token = req.cookies.token;

    // if token is not sent 
    if(!token) return res.status(401).json({message : "authentication token is required"});

  try {
    
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
    console.log(decodedToken);

    if(decodedToken.role != "artist") return res.status(403).json({message : "Don't have permission to perform this operation"});

  } catch (error) {
    console.log("error message is",error.message);
    return res.status(500).json({message : error.message});
  }
}


module.exports = createMusic;