

const express = require("express");
const router = express.Router();

const {registerUser} = require("../controllers/auth.controller");

// register api 

router.route("/register" , registerUser);


module.exports = router;