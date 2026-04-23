

const express = require("express");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());


const authRoute = require("./routes/auth.route");

app.use("/api/auth",authRoute);


module.exports = app;