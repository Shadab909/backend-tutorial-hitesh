import {v2 as cloudinary} from 'cloudinary'
import fs from "fs"
          
cloudinary.config({ 
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET 
});


const uploadOnCloudinary = async (localFilePath) => {
   try {
    if(!localFilePath) return null
    const resoponse  = await cloudinary.uploader.upload(localFilePath, {
        resource_type : "auto"
    })
    console.log("File uploaded successfully !!" , resoponse.url);
    return resoponse

   } catch (error) {
    fs.unlinkSync(localFilePath) // deleted or unlinked the file from local storage
    console.log("File upload failed !!",error);
    return null
   }
}

