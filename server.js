
require("dotenv").config();

const app = require("./src/app");
const connectDB = require("./src/db/db");


async function startServer()
{
    try {
        await connectDB();
        app.listen(3000 , () =>{
            console.log("server is up at port no 3000");
        });
    } catch (error) {
        console.log("error is",error.message);
        process.exit(1);
    }
}


startServer();