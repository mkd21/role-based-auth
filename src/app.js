

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


// signup and login route 
const authRoute = require("./routes/auth.route");
app.use("/api/auth",authRoute);


// music creation route 

const musicRoute = require("./routes/music.route");
app.use("/api/music",musicRoute);

module.exports = app;