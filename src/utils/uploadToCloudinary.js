const cloudinary = require("./cloudinary");

const uploadToCloudinary = (fileBuffer, filename) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { folder: "products", public_id: filename },
      (err, result) => {
        if (err) reject(err);
        else resolve(result?.secure_url);
      }
    ).end(fileBuffer);
  });
};

module.exports = uploadToCloudinary;
