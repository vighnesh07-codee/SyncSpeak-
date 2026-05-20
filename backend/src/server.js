import "dotenv/config";
import express from "express";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";




const app = express()

const PORT = process.env.PORT || 3000

app.use(express.json()) //req.body
app.use(cookieParser());

app.use("/api/auth",authroutes)
app.use("/api/message",messageroutes)

app.listen( PORT , () => {
    console.log(`server is running on port ${PORT}`)
    connectDB()
})