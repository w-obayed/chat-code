import express from "express";
import authMiddleware from "../middlewares/authMiddleware.js";
import {
  createNewMessage,
  getAllMessage,
} from "../controllers/messageController.js";

// init router from express
const router = express.Router();

// routing
router.post("/new-message", authMiddleware, createNewMessage);
router.get("/all-message/:chatId", authMiddleware, getAllMessage);

// export default
export default router;
