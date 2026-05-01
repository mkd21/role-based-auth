
const express = require("express");
const router = express.Router();

const createMusic = require("../controllers/music.controller");

const upload = require("../middleware/multer.middleware");

router.post("/create", upload.single("file") , createMusic);


module.exports = router;