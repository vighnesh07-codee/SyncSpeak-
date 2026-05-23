import { Message } from "../models/Massege.js";
import { User } from "../models/User.js";

export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);

  } catch (error) {
    console.log("Error in getAllContacts:", error);

    res.status(500).json({
      message: "Server error",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    // Get unique users who have messages with the logged-in user
    const chatPartners = await Message.find({
      $or: [
        { senderId: loggedInUserId },
        { receiverId: loggedInUserId },
      ],
    })
      .populate("senderId", "-password")
      .populate("receiverId", "-password")
      .sort({ createdAt: -1 });

    // Extract unique chat partners
    const uniquePartners = new Map();
    chatPartners.forEach((msg) => {
      const partnerId = msg.senderId._id.equals(loggedInUserId)
        ? msg.receiverId._id
        : msg.senderId._id;
      const partnerData = msg.senderId._id.equals(loggedInUserId)
        ? msg.receiverId
        : msg.senderId;

      if (!uniquePartners.has(partnerId.toString())) {
        uniquePartners.set(partnerId.toString(), partnerData);
      }
    });

    res.status(200).json(Array.from(uniquePartners.values()));
  } catch (error) {
    console.log("Error in getChatPartners:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMessagesByUserId = async (req, res) => {
  try {
    const { id: userIdToChat } = req.params;
    const loggedInUserId = req.user._id;

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUserId, receiverId: userIdToChat },
        { senderId: userIdToChat, receiverId: loggedInUserId },
      ],
    }).sort({ createdAt: 1 });

    res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const { message, image } = req.body;
    const senderId = req.user._id;

    // Validate input
    if (!message && !image) {
      return res.status(400).json({ message: "Message or image is required" });
    }

    // Create and save message
    const newMessage = new Message({
      senderId,
      receiverId,
      message: message || "",
      image: image || "",
    });

    await newMessage.save();

    res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error);
    res.status(500).json({ message: "Server error" });
  }
};