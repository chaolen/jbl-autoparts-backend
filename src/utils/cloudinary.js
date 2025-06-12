const dotenv = require('dotenv');
dotenv.config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: 'dpalykwio',
  api_key: '876248621436423',
  api_secret: 'k5wwnLUHSwE3MyBA4EB63joDbEM',
});

module.exports = cloudinary;
