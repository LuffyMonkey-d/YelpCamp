const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
        folder: 'YelpCamp',
        allowed_formats: ['jpeg', 'jpg', 'png', 'webp']
    },
});

module.exports = {
    cloudinary,
    storage
}

// const cloudinary = require('cloudinary').v2;
// const { CloudinaryStorage } = require('multer-storage-cloudinary');
// const multer = require('multer');
 

 
// const storage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: 'YelpCamp',
//     format: async (req, file) => ['jpeg', 'png', 'jpg'], // supports promises as well
//     // public_id: (req, file) => 'computed-filename-using-request',
//   },
// });
 
// const parser = multer({ storage: storage });

// module.exports = {
//     cloudinary,
//     storage
// }