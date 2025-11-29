import express from "express"
export const userRouter=express.Router();
import { currentUser } from "../Controllers/user.controllers.js";
import { isAuth } from "../Middlewares/isAuth.Middlewares.js";
import { otheruser } from "../Controllers/user.controllers.js";
userRouter.get("/current",isAuth,currentUser)
userRouter.get("/otheruser",isAuth,otheruser)