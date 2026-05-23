import { generateToken } from "../lib/utils.js";
import { User } from "../models/User.js";
import bcrypt from "bcryptjs"
import { sendWelcomeEmail } from "../lib/resend.js";
import cloudinary from "../lib/cloudinary.js"

export const signup = async (req, res) => {
    const { fullname, fullName, email, password } = req.body;
    const resolvedFullName = fullname || fullName;

    try {
        // ─── Validate Input ────────────────────────────────
        if (!resolvedFullName || !email || !password) {
            return res.status(400).json({ message: "all fields are required" });
        }

        if (password.length < 6) {
            return res.status(400).json({ message: "password must be at least 6 characters" });
        }

        // ─── Validate Email Format ─────────────────────────
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: "invalid email format" });
        }

        // ─── Check if User Already Exists ──────────────────
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "email already exists" });
        }

        // ─── Hash Password ─────────────────────────────────
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // ─── Create New User ───────────────────────────────
        const newUser = new User({
            fullname: resolvedFullName,
            email,
            password: hashedPassword,
        });

        // ─── Save User & Generate Token ────────────────────
        generateToken(newUser._id, res);
        await newUser.save();

        // ─── Send Welcome Email ────────────────────────────
        try {
            await sendWelcomeEmail({
                fullname: newUser.fullname,
                email: newUser.email,
            });
        } catch (emailError) {
            console.warn("⚠️ Welcome email failed, but signup succeeded:", emailError.message);
            // Don't fail signup if email fails
        }

        // ─── Return User Data ──────────────────────────────
        res.status(201).json({
            _id: newUser._id,
            fullname: newUser.fullname,
            email: newUser.email,
            profilepic: newUser.profilepic,
        });

    } catch (error) {
        console.error("❌ Error in signup controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};
export const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        // ─── Validate Input ─────────────────────────────────
        if (!email || !password) {
            return res.status(400).json({ message: "email and password are required" });
        }

        // ─── Find User by Email ────────────────────────────
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // ─── Compare Password with Hash ────────────────────
        const isPasswordCorrect = await bcrypt.compare(password, user.password);
        if (!isPasswordCorrect) {
            return res.status(401).json({ message: "Invalid email or password" });
        }

        // ─── Generate JWT Token ────────────────────────────
        generateToken(user._id, res);

        // ─── Return User Data ──────────────────────────────
        res.status(200).json({
            _id: user._id,
            fullname: user.fullname,
            email: user.email,
            profilepic: user.profilepic,
        });

    } catch (error) {
        console.error("❌ Error in login controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const logout = (req, res) => {
    try {
        // ─── Clear JWT Cookie ──────────────────────────────
        res.clearCookie("jwt");

        // ─── Return Success Message ────────────────────────
        res.status(200).json({ message: "Logged out successfully" });

    } catch (error) {
        console.error("❌ Error in logout controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const forgot = async (req, res) => {
    const { email } = req.body;

    try {
        // ─── Validate Input ────────────────────────────────
        if (!email) {
            return res.status(400).json({ message: "email is required" });
        }

        // ─── Find User by Email ────────────────────────────
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "user not found" });
        }

        // ─── TODO: Implement Password Reset Logic ──────────
        // This should:
        // 1. Generate a reset token (JWT or crypto)
        // 2. Save token hash to user (with expiry)
        // 3. Send reset email with reset link
        // 4. Return success message

        res.status(200).json({
            message: "If email exists, password reset link has been sent",
        });

    } catch (error) {
        console.error("❌ Error in forgot password controller:", error.message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const updateProfile = async (req, res) => {
  try {
    const { profilePic } = req.body;

    if (!profilePic) {
      return res.status(400).json({
        message: "Profile pic is required",
      });
    }

    const userId = req.user._id;

    const uploadResponse = await cloudinary.uploader.upload(profilePic);

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        profilePic: uploadResponse.secure_url,
      },
      {
        new: true,
      }
    );

    res.status(200).json(updatedUser);

  } catch (error) {
    console.log("Error in update profile:", error);

    res.status(500).json({
      message: "Internal server error",
    });
  }
};