import express from "express";
import {
  createUser,
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
} from "../controllers/userController.js";
import { userPhoto } from "../utils/multer.js";
import authMiddleware from "./../middlewares/authMiddleware.js";

// init router from express
const router = express.Router();

// routing
router.get("/logged-user", authMiddleware, getSingleUser);
router.get("/all-user", authMiddleware, getAllUser);
router.route("/").post(userPhoto, createUser);
router.route("/:id").delete(deleteUser).put(updateUser).patch(updateUser);

// export default
export default router;
