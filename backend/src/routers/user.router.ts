import express from "express";
import { UserController } from "../controllers/user.controller";

const userRouter = express.Router();

userRouter.route('/login').post(
    (req, res)=>{
        console.log(req.body)
        new UserController().login(req, res)
    }
)

userRouter.route('/emailCheck').post(
    (req, res)=>new UserController().emailCheck(req, res)
)

userRouter.route('/usernameCheck').post(
    (req, res)=>new UserController().usernameCheck(req, res)
)

userRouter.route('/countOwners').get(
    (req, res)=>new UserController().countOwners(req, res)
)

userRouter.route('/countTourists').get(
    (req, res)=>new UserController().countTourists(req, res)
)

userRouter.route('/countCottages').get(
    (req, res)=>new UserController().countCottages(req, res)
)

userRouter.route('/last30').get(
    (req, res)=>new UserController().last30(req, res)
)

userRouter.route('/last7').get(
    (req, res)=>new UserController().last7(req, res)
)

userRouter.route('/lastDay').get(
    (req, res)=>new UserController().lastDay(req, res)
)

userRouter.route('/searchCottage').post(
    (req, res)=>new UserController().searchCottage(req, res)
)

userRouter.route('/checkOldPass').post(
    (req, res)=>new UserController().checkOldPass(req, res)
)

userRouter.route('/changePass').post(
    (req, res)=>new UserController().changePass(req, res)
)

userRouter.route('/allCottages').get(
    (req, res)=>new UserController().allCottages(req, res)
)

userRouter.route('/allOwners').get(
    (req, res)=>new UserController().allOwners(req, res)
)

userRouter.route('/allTourists').get(
    (req, res)=>new UserController().allTourists(req, res)
)

export default userRouter;

