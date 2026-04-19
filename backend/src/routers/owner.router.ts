import express from "express";
import multer from 'multer';
import path from "path";
import { OwnerController } from "../controllers/owner.controller";
import { upload } from "./register.router";

const ownerRouter = express.Router();

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.resolve(__dirname, '../../gallery'));
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const uploadOwner = multer({ storage: storage });

ownerRouter.route('/getInfo').post(
    (req, res) => new OwnerController().getInfo(req, res)
)

ownerRouter.route('/saveData').post(
    upload.single('image'),
    (req, res) => new OwnerController().saveData(req, res)
)

ownerRouter.route('/getMyCottages').post(
    (req, res) => new OwnerController().getMyCottages(req, res)
)

ownerRouter.route('/updateCottage').post(
    uploadOwner.single('image'),
    (req, res) => {
        console.log(req.file?.filename);
        new OwnerController().updateCottage(req, res)
    }
)

ownerRouter.route('/deleteCottage').post(
    (req, res) => {
        console.log(req.body);
        new OwnerController().deleteCottage(req, res)
    }
)

ownerRouter.route('/createCottage').post(
    uploadOwner.array("images", 10),
    (req, res) => new OwnerController().createCottage(req, res)
)

ownerRouter.route('/myRes').post(
    (req, res) => {
        new OwnerController().myRes(req, res)
    }
)

ownerRouter.route('/approveRes').post(
    (req, res) => {
        console.log(req.body);
        new OwnerController().approveRes(req, res)
    }
)

ownerRouter.route('/rejectRes').post(
    (req, res) => {
        console.log(req.body);
        new OwnerController().rejectRes(req, res)
    }
)

export default ownerRouter