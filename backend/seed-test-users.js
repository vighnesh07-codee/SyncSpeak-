import "dotenv/config";
import mongoose from "mongoose";
import { User } from "./src/models/User.js";
import bcrypt from "bcryptjs";
import { connectDB } from "./src/lib/db.js";

const TEST_USERS = [
  {
    fullname: "Alice Smith",
    email: "alice@example.com",
    password: "alice123",
  },
  {
    fullname: "Bob Johnson", 
    email: "bob@example.com",
    password: "bob123",
  },
  {
    fullname: "Charlie Brown",
    email: "charlie@example.com",
    password: "charlie123",
  },
];

async function seedTestUsers() {
  try {
    await connectDB();
    console.log("✅ Connected to MongoDB");

    for (const testUser of TEST_USERS) {
      // Check if user already exists
      const existingUser = await User.findOne({ email: testUser.email });
      if (existingUser) {
        console.log(`⚠️ User already exists: ${testUser.email}`);
        continue;
      }

      // Hash password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(testUser.password, salt);

      // Create user
      const newUser = new User({
        fullname: testUser.fullname,
        email: testUser.email,
        password: hashedPassword,
      });

      await newUser.save();
      console.log(`✅ Created user: ${testUser.email}`);
    }

    console.log("\n📋 All test users created successfully!");
    console.log("\nAvailable test accounts:");
    console.log("━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━");
    TEST_USERS.forEach(user => {
      console.log(`📧 ${user.email}`);
      console.log(`🔑 ${user.password}\n`);
    });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding test users:", error.message);
    process.exit(1);
  }
}

seedTestUsers();
