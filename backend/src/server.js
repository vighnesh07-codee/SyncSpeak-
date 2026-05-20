import express from "express";
import dotenv from "dotenv";
import authroutes from "./routes/auth.route";
import messageroutes from "./routes/message.route";

dotenv.config()

const app = express()

const PORT = 3000 || process.env.PORT

app.use("/api/auth",authroutes)
app.use("/api/message",messageroutes)

app.listen( PORT , () => {
    console.log(`server is running on port ${PORT}`)
})