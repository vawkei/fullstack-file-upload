const cloudinary =require("cloudinary").v2;
const fs = require("fs");

const uploadImage =async (req, res) => {
    const result = await cloudinary.uploader.upload(
        req.files.image.tempFilePath,
        {use_filename:true, folder:"fullstack-file-upload"}
    );

    fs.unlinkSync(req.files.image.tempFilePath)
    //console.log(result);
    
    res.status(200).json({msg:{src:result.secure_url, public_id:result.public_id}})
    // res.send("<h1>Upload Image </h1>");
};

module.exports = {uploadImage};