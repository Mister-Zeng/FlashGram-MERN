import express from 'express';
import { retrieveToken, verifyToken } from "../controllers/auth-controller.js";


const authRouter = express.Router();

authRouter.get('/tokenverify', retrieveToken);
authRouter.post('/tokenverify', verifyToken)

export default authRouter;
