import multer from 'multer';
import { GridFsStorage } from 'multer-gridfs-storage';
import dotenv from 'dotenv';

dotenv.config();

const mongoURI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/blog";

const storage = new GridFsStorage({
    url: mongoURI,
    options: { useNewUrlParser: true },
    file: (request, file) => {
        const match = ["image/png", "image/jpeg", "image/jpg"];

        if(match.indexOf(file.mimetype) === -1) {
            return new Error('Only image files are allowed');
        }

        return {
            bucketName: "photos",
            filename: `${Date.now()}-blog-${file.originalname}`
        }
    }
});

export default multer({storage}); 