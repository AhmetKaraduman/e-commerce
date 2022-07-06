import express from "express";
import {
	saveAddress,
	changeAddress,
	getAddress,
} from "../controllers/shippingAddressController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router
	.route("/")
	.get(protect, getAddress)
	.post(protect, saveAddress)
	.put(protect, changeAddress);

export default router;
