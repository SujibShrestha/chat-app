import { v2 as cloudinary } from "cloudinary";
import fs from "fs"; // File system
import dotenv from "dotenv";
dotenv.config();


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME!,
  api_key: process.env.CLOUDINARY_API_KEY!,
  api_secret: process.env.CLOUDINARY_API_SECRET!,
});
 


const uploadOnCloudinary = async (localFilePath: string) => {
  try {
    if (!localFilePath) return null;
    //upload the file on cloudinary

    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    //file has been uploaded
    return response;
  } catch (error) {
    console.log("error while uploading")
    fs.unlinkSync(localFilePath); // remove the locally saved temporary file if operation is failed
    return null;
  }
};

export {uploadOnCloudinary}
