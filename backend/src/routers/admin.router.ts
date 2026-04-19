import express from "express";
import { AdminController } from "../controllers/admin.controller";
import multer from "multer";

const adminRouter = express.Router()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

export const upload = multer({ storage: storage });

adminRouter.route('/login').post(
    (req, res) => new AdminController().login(req, res)
)

adminRouter.route('/getInfo').post(
    (req, res) => new AdminController().getInfo(req, res)
)

adminRouter.route('/allOwners').get(
    (req, res) => new AdminController().allOwners(req, res)
)

adminRouter.route('/allTourists').get(
    (req, res) => new AdminController().allTourists(req, res)
)

adminRouter.route('/create').post(
    upload.single('image'),
    (req, res) => {
        new AdminController().create(req, res)
    }
)

adminRouter.route('/approve').post(
    (req, res) => new AdminController().approve(req, res)
)

adminRouter.route('/deny').post(
    (req, res) => new AdminController().deny(req, res)
)

adminRouter.route('/removeRqst').post(
    (req, res) => new AdminController().deleteRqst(req, res)
)

adminRouter.route('/delete').post(
    (req, res) => new AdminController().delete(req, res)
)

adminRouter.route('/deactivate').post(
    (req, res) => new AdminController().deactivate(req, res)
)

adminRouter.route('/edit').post(
    upload.single('image'),
    (req, res) => {
        new AdminController().edit(req, res)
    }
)

adminRouter.route('/rqst').get(
    (req, res) => new AdminController().rqst(req, res)
)

export default adminRouter;