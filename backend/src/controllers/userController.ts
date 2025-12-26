import type { Request, Response } from "express";
import { User } from "../models/user.model.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import fs from "fs";

const uploadAvatar = async(req:Request,res:Response)=>{
    try {
        const userId = (req as any).user._id;
        console.log(userId)
        if(!req.file){
            return res.status(400).json({message:"NO file uploaded"})
        }
        const localFilePath = req.file.path

        const result = await uploadOnCloudinary(localFilePath);
            if (fs.existsSync(localFilePath)) fs.unlinkSync(localFilePath); //delete temp file

            if(!result){
                return res.status(500).json({message:"Error while uploading file"})
            }

            //save avatar
            const updatedUser = await User.findByIdAndUpdate(userId,{avatar:result.secure_url},{new:true}).select("-password");

            return res.json({success: true,
                avatar:result.secure_url,
                user:updatedUser
            })

    } catch (error) {
           console.error(error);
    res.status(500).json({ message: "Server error" });
    }
}

export {uploadAvatar}