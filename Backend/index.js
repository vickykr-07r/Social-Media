import express from "express"
let app = express();

import dotenv from "dotenv"
dotenv.config();

app.use(express.json())

import cors from "cors"
app.use(cors({ 
    origin: "http://localhost:5173",
    credentials: true
}));


import connectdb from "../Backend/Database/connectdb.js"

import cookieParser from "cookie-parser";
app.use(cookieParser())
 
import { authRouter } from "./Routes/auth.route.js";
app.use("/api/auth",authRouter)

import { userRouter } from "./Routes/user.route.js";
app.use("/api/user",userRouter)

app.listen(process.env.PORT, () => {
    connectdb()
    console.log(`the app is listening`)
})
