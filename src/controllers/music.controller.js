
const musicModel = require("../models/music.model");
const jwt = require("jsonwebtoken");

const uploadMusic = require("../services/storage.service");

const fs = require("fs/promises");

async function createMusic(req , res){

    const token = req.cookies.token;

    // if token is not sent 
    if(!token) return res.status(401).json({message : "authentication token is required"});


  try {
    
    const decodedToken = jwt.verify(token , process.env.JWT_SECRET);
    // console.log(decodedToken);

    // if user is not an artist 
    if(decodedToken.role != "artist") return res.status(403).json({message : "Don't have permission to perform this operation"});


    // if music file is not present 
    if(!req.file) return res.status(400).json({ message: "Music file is required" });

    
    const {title} = req.body;

    const uploadResponse = await uploadMusic(req.file);

    return res.status(201).json({
            message: "Music uploaded successfully",
            url: uploadResponse.url
        });

  } 
  catch (error) {

    console.log("error message is",error.message);

    // also clean file if upload fails
    if (req.file?.path) 
    {
      try {
        await fs.unlink(req.file.path);
      } 
      catch (_) {}
    }

    return res.status(500).json({message : error.message});
  }
  finally{
    if(req.file?.path)
    {
      try {
        await fs.unlink(req.file.path);
        console.log("Local file deleted");
      } catch (error) {
        console.log("File deletion failed:", error.message);
      }
    }
  }
}

module.exports = createMusic;