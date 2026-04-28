
const musicModel = require("../models/music.model");

const jwt = require("jsonwebtoken");

async function createMusic(req , res){

    const token = req.cookies.token;

    console.log(token);

    const decodedToken = jwt.decode(token , process.env.JWT_SECRET);

    console.log(decodedToken);

}


module.exports = createMusic;