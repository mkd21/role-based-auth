
const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");


// REGISTER API 
async function registerUser(req , res)
{
    const {userName , email , password , role = "user"} = req.body;
    
    try {

        // check if all fields are received or not 
        if(!userName || !email || !password) return res.status(400).json({message : "all field are required"});


        // check if role is something else rather than ["user" , "artist"]
        const allowedRoles = ["user", "artist"];

        if (!allowedRoles.includes(role)) return res.status(400).json({ message: "Invalid role" });

        // check if user already exist 
        const existingUser = await userModel.findOne({
            $or : [ {userName} , {email} ]
        });

        if(existingUser) return res.status(409).json({message : "user already exist"});

        
        // password hashing 

        const hashedPassword = await bcrypt.hash(password , 11);

        // create new entry in DB 

        const newUser = await userModel.create({
            userName,
            email,
            password : hashedPassword,
            role : role
        });

        const token = jwt.sign({
            id : newUser._id,
            role : newUser.role
        } , process.env.JWT_SECRET);
        

        res.cookie("token" , token , { httpOnly : true , secure : process.env.NODE_ENV === "production" , sameSite : "strict" });

        res.status(201).
        json({message : "user register successfully", 
            userDetails : { id : newUser._id , userName : newUser.userName , email : newUser.email} 
        });


    } catch (error) {
        
        console.log("error message",error.message);
        return res.status(500).json({ message: "internal server error"});
    }
}


// LOGIN API 
async function login(req , res) {
    
    const {email , userName , password} = req.body;   // Either username or email will be provided

    try {

        if (!email && !userName) return res.status(400).json({ message: "Email or username required" });

        if (email && userName) return res.status(400).json({ message: "Provide either email or username, not both" });


        // check if email or username actually exist or not 

        let existingUser;

        if(email){
            existingUser = await userModel.findOne({email});
        }
        else{
            existingUser = await userModel.findOne({userName});
        }

        // console.log(existingUser);

        if(!existingUser) return res.status(400).json({ message: "Invalid credentials" });
        
        // check if password is correct or not 

        const passwordCorrect = await bcrypt.compare(password , existingUser.password);

        if(!passwordCorrect) return res.status(400).json({ message: "Invalid credentials" });

        const token = jwt.sign({ id : existingUser._id , role : existingUser.role } , process.env.JWT_SECRET);

        return res.cookie("token",token , 
            {
                httpOnly : true,
                secure : process.env.NODE_ENV == "production",
                sameSite : "strict"
            })
        .status(200)
        .json({ userDetails : { userName : existingUser.userName , email : existingUser.email , role : existingUser.role } });

    } catch (error) {
        console.log("error occured",error.message);
        return res.status(500).json({message : "internal server error"});
    }
}

module.exports = {registerUser , login};