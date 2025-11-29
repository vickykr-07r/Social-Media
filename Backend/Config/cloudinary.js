import { v2 as cloudinary } from 'cloudinary';
import fs from "fs";


cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET_KEY  
});

async function uploadoncloudinary(file) {     
    try {

        const uploadResult = await cloudinary.uploader
            .upload(file, { resource_type: 'auto' })
            .catch((error) => {
                console.log(error);
            });

        fs.unlinkSync(file);

        return uploadResult;

    } catch (error) {
     fs.unlinkSync(file);
     return res.status(500).json({
        message:`error on backend cloudinary ${error}`
     })
}}

export default uploadoncloudinary;
