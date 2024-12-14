import express from "express";
import { createNewChat, getAllChat } from "../controllers/chatController.js";
import authMiddleware from "../middlewares/authMiddleware.js";

// init router from express
const router = express.Router();

// routing
router.post("/create-new-chat", authMiddleware, createNewChat);
router.get("/get-all-chat", authMiddleware, getAllChat);

// export default
export default router;
