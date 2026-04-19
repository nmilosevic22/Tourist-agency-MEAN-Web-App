import express from "express";
import { TouristController } from "../controllers/tourist.controller";
import { upload } from "./register.router";

const touristRouter = express.Router();

touristRouter.route('/getInfo').post(
    (req, res) => new TouristController().getInfo(req, res)
)

touristRouter.route('/saveData').post(
    upload.single('image'),
    (req, res) => new TouristController().saveData(req, res)
)

touristRouter.route('/getCottages').get(
    (req, res) => new TouristController().getCottages(req, res)
)

touristRouter.route('/searchCottage').post(
    (req, res) => new TouristController().searchCottage(req, res)
)

touristRouter.route('/getCottage').post(
    (req, res) => new TouristController().getCottage(req, res)
)

touristRouter.route('/getUser').post(
    (req, res) => new TouristController().getUser(req, res)
)

touristRouter.route('/createRes').post(
    (req, res) => new TouristController().createRes(req, res)
)

touristRouter.route('/checkRes').post(
    (req, res) => new TouristController().checkRes(req, res)
)

touristRouter.route('/myRes').post(
    (req, res) => new TouristController().myRes(req, res)
)

export default touristRouter;