
const mongoose = require("mongoose");


async function connectDB() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Database connected successfully");
    } catch (error) {
        console.error("DB connection failed:", error.message);
        throw error;
    }
}

module.exports = connectDB;