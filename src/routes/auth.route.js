

const express = require("express");
const router = express.Router();

const {registerUser , login} = require("../controllers/auth.controller");

// register api 

router.post("/register" , registerUser);

router.get("/login" , login);

module.exports = router;