import { v2 as cloudinary } from 'cloudinary';

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

const upload = async (image) => {
  try {
    let urls = "";
    let data = await cloudinary.uploader.upload(image, {
      unique_filename: true,
      discard_original_filename: true,
      folder: "appointment_doc",
      timeout: 120000,
    });
    urls = data.url;
    return urls;
  } catch (error) {
    console.error(error);
  }
};

export default upload;