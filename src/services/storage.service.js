
const { ImageKit } = require("@imagekit/nodejs");
// const {Readable} = require("stream");

const fs = require("fs");


const imageKitInstance = new ImageKit({
    privateKey: process.env.IMAGE_KIT_KEY
});

async function uploadMusic(file) {
    try {
        console.log("Uploading:", file.originalname);

        // const stream = Readable.from(file.buffer);   

        const stream = fs.createReadStream(file.path);

        stream.on("error", (err) => {
            console.log("STREAM ERROR:", err);
        });

        const response = await imageKitInstance.files.upload({
            file: stream,
            fileName: file.filename,
            folder: "/music",
        });

        console.log("ImageKit response:", response);

        return response;

    } catch (error) {
        console.log("UPLOAD ERROR:", error);
        throw error;
    }
}

module.exports = uploadMusic;