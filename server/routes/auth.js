import express from "express";
import { login, signup } from "../controllers/authController.js";

// init router from express
const router = express.Router();

// routing
router.post("/signup", signup);
router.post("/login", login);

// export default
export default router;
