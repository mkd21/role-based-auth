
const express = require("express");
const router = express.Router();

const createMusic = require("../controllers/music.controller");


router.post("/create",createMusic);


module.exports = router;