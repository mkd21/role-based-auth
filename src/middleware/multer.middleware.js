
// const multer = require("multer");

// const storage = multer.memoryStorage();

// const upload = multer({storage});

// above approach when files needs to be stored in RAM 


const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({

    destination : function(req , file , cb){
        cb(null , "uploads/");
    },

    filename : function(req , file , cb){
        const uniqueName = Date.now() + "-" + file.originalname;
        cb(null , uniqueName);
    }

});

const upload = multer({storage , 
    limits : {  fileSize : 20 * 1024 * 1024}   // upto 20 MB allowed
});

module.exports = upload;