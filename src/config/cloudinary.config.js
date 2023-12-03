const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: "dqiqayxwe",
  api_key: "948626715334294",
  api_secret: "6LRvIpkHKkkIuUaQuIjQlofCXgQ",
});

const storage = new CloudinaryStorage({
  cloudinary,
  allowedFormats: ["jpg", "png"],
  params: {
    folder: "cuahangthoitrang",
  },
});

const uploadCloud = multer({ storage });

module.exports = uploadCloud;
