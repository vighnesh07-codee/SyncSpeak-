import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./src/models/User.js";
import bcrypt from "bcryptjs";
import { connectDB } from "./src/lib/db.js";

const DEMO_USER = {
  fullname: "Demo User",
  email: "demo@example.com",
  password: "demo123",
};

async function seedDemoUser() {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    // Check if demo user already exists
    const existingUser = await User.findOne({ email: DEMO_USER.email });
    if (existingUser) {
      console.log("⚠️ Demo user already exists!");
      console.log(`📧 Email: ${DEMO_USER.email}`);
      console.log(`🔑 Password: ${DEMO_USER.password}`);
      process.exit(0);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(DEMO_USER.password, salt);

    // Create demo user
    const newUser = new User({
      fullname: DEMO_USER.fullname,
      email: DEMO_USER.email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("✅ Demo user created successfully!");
    console.log(`📧 Email: ${DEMO_USER.email}`);
    console.log(`🔑 Password: ${DEMO_USER.password}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding demo user:", error.message);
    process.exit(1);
  }
}

seedDemoUser();
