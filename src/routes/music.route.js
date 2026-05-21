
const express = require("express");
const router = express.Router();

const createMusic = require("../controllers/music.controller");

const upload = require("../middleware/multer.middleware");

router.post("/create", (req , res) => {

    upload.single("file")(req , res , function(error){

        if(error)
        {
            if(error.code == "LIMIT_FILE_SIZE"){

                return res.status(400).json({
                    message: "File too large"
                });
            }

            return res.status(500).json({
                message: error.message
            });
        }

        createMusic(req , res);
    });
});


module.exports = router;