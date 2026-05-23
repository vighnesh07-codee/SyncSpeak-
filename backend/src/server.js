import "dotenv/config";
import express from "express";
import cors from "cors";
import authroutes from "./routes/auth.route.js";
import messageroutes from "./routes/message.route.js";
import {connectDB} from "./lib/db.js"
import cookieParser from "cookie-parser";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);

// Determine frontend URL based on environment
const FRONTEND_URL = process.env.NODE_ENV === "production" 
  ? process.env.FRONTEND_URL || "http://localhost:5173"
  : "http://localhost:5173";

const io = new Server(server, {
  cors: {
    origin: FRONTEND_URL,
    credentials: true,
  },
});

const PORT = process.env.PORT || 5000;

// CORS middleware
app.use(cors({
  origin: FRONTEND_URL,
  credentials: true,
}));

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authroutes);
app.use("/api/message", messageroutes);

// Socket.io connection handling
const userSocketMap = {};

io.on("connection", (socket) => {
  const userId = socket.handshake.query.userId;

  if (userId) userSocketMap[userId] = socket.id;

  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  socket.on("disconnect", () => {
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

const startServer = async () => {
    await connectDB();
    
    server.listen(PORT, () => {
        console.log(`✅ Server is running on port ${PORT}`);
    });
};

startServer().catch(err => {
    console.error("❌ Failed to start server:", err.message);
    process.exit(1);
});