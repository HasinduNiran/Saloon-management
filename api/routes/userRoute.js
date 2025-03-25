import express from "express";
import {
  deleteUser,
  getAllUsers,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

const router = express.Router();
router.get("/", verifyToken, getAllUsers);
router.put("/:id", verifyToken, updateUser);
router.delete("/:id", verifyToken, deleteUser);

export default router;
