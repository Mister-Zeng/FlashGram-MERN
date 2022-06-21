import express from 'express';
import { getAllUser, signup, login } from "../controllers/user-controller.js";

const userRouter = express.Router();

const usernameToLowerCase = (req, res, next) => {
    req.body.username = req.body.username.toLowerCase();
    next();
}

userRouter.get('/', getAllUser);
userRouter.post('/signup', usernameToLowerCase, signup)
userRouter.post('/login', usernameToLowerCase, login)
export default userRouter;

