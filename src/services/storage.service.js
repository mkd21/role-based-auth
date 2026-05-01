
const imageKit = require("@imagekit/nodejs");

const imageKitInstance = new imageKit({

    privateKey: "private_JqJ02HnrGSNmATTjFPaw5lIWA0g="

});

async function uploadMusic(file) {
    
    const response = await imageKitInstance.files.upload({
        file : file.buffer,
        fileName : file.originalname,
        folder : "/music"
    });

    return response;
}

module.exports = uploadMusic;