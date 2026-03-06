import multer from "multer";
import cloudinary from "./cloudinary.js";
import {CloudinaryStorage} from 'multer-storage-cloudinary'

const storage = new CloudinaryStorage({
    cloudinary: cloudinary.v2,
    params: {
        folder: "cloudinary_images",
        allowed_formats: ["jpg", "jpeg", "png", "webp"],
        transformation: [{ quality: "auto" }, { fetch_format: "auto" }],
    },
});

const upload = multer({ storage });
export default upload;
