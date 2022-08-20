import express from "express";
import {
	createCart,
	getCart,
	updateCart,
	deleteCart,
} from "../controllers/cartController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/:id").put(protect, updateCart).delete(protect, deleteCart);
router.route("/").post(protect, createCart).get(protect, getCart);

export default router;
