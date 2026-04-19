import express from "express";
import multer from 'multer';
import { RegisterController } from "../controllers/register.controller";

const registerRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });

registerRouter.route('/createReq').post(
    upload.single('image'), (req, res)=>new RegisterController().createReq(req, res)
)

export default registerRouter