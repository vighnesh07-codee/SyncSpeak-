import express from "express";
import { forgot, login, logout, signup ,updateProfile } from "../controllers/auth.controllers.js";
import { protectRoute } from "../middleware/auth.middleware.js";
import {arcjetProtection} from "../middleware/arcjet.middleware.js";

const router = express.Router();

router.use(arcjetProtection);

router.get("/test", (req,res) => res.status(200).json({message:"test route"}))

router.post("/signup", signup)

router.post("/login",  login)

router.post("/logout",  logout)

router.post("/forgot",  forgot)

router.put("update", arcjetProtection ,protectRoute, updateProfile)

router.get("/check",  protectRoute,(req,res) => res.status(200).json(req.user))

export default router;