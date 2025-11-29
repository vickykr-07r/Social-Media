import express from "express"
export let authRouter=express.Router();
import {Signup} from "../Controllers/auth.controllers.js"
import { Login } from "../Controllers/auth.controllers.js";
import { Logout } from "../Controllers/auth.controllers.js";
import { verifyotp } from "../Controllers/auth.controllers.js";
import { resetpassword } from "../Controllers/auth.controllers.js";
import { sendotp } from "../Controllers/auth.controllers.js";

authRouter.post("/signup",Signup)
authRouter.post("/login",Login)
authRouter.get("/logout",Logout)
authRouter.post("/sendotp",sendotp)
authRouter.post("/verifyotp",verifyotp)
authRouter.post("/resetpassword",resetpassword)