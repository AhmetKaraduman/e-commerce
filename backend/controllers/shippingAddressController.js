import asyncHandler from "express-async-handler";
import ShippingAddress from "../models/shippingAddressModel.js";
import User from "../models/userModel.js";

// @desc   get address
// @route  GET /api/shippingaddress
// @access Private
const getAddress = asyncHandler(async (req, res) => {
	const user = User.findById(req.user._id);

	if (user) {
		const { email } = req.user;
		const shippingAddress = await ShippingAddress.findOne({
			userEmail: email,
		});

		if (shippingAddress) {
			res.status(200);
			res.json({
				address: shippingAddress.address,
				city: shippingAddress.city,
				postalCode: shippingAddress.postalCode,
				country: shippingAddress.country,
				email: shippingAddress.userEmail,
			});
		}
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc   save address
// @route  POST /api/shippingaddress
// @access Private
const saveAddress = asyncHandler(async (req, res) => {
	const user = User.findById(req.user._id);

	if (user) {
		const { address, city, postalCode, country, email } = req.body;
		const existAddress = await ShippingAddress.findOne({ userEmail: email });

		if (existAddress) {
			res.status(400);
			throw new Error(
				"User already has an address. If you want to change address, try CHANGE ADDRESS."
			);
		} else {
			const createdAddress = await ShippingAddress.create({
				user: req.user._id,
				address,
				city,
				postalCode,
				country,
				userEmail: email,
			});

			if (createdAddress) {
				res.status(201);
				res.json({
					address: createdAddress.address,
					city: createdAddress.city,
					postalCode: createdAddress.postalCode,
					county: createdAddress.country,
					email: createdAddress.userEmail,
				});
			} else {
				res.status(400);
				throw new Error("Address did not save");
			}
		}
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

// @desc   change address
// @route  PUT /api/shippingaddress
// @access Private
const changeAddress = asyncHandler(async (req, res) => {
	const user = await User.findById(req.user._id);
	if (user) {
		const { email } = req.body;
		const shippingAddress = await ShippingAddress.findOne({
			userEmail: email,
		});

		if (shippingAddress) {
			shippingAddress.address = req.body.address || shippingAddress.address;
			shippingAddress.city = req.body.city || shippingAddress.city;
			shippingAddress.postalCode =
				req.body.postalCode || shippingAddress.postalCode;
			shippingAddress.country = req.body.country || shippingAddress.country;

			const updatedShippingAddress = await shippingAddress.save();

			res.status(200);
			res.json({
				address: updatedShippingAddress.address,
				city: updatedShippingAddress.city,
				postalCode: updatedShippingAddress.postalCode,
				county: updatedShippingAddress.country,
				email: updatedShippingAddress.userEmail,
			});
		} else {
			res.status(404);
			throw new Error("Address not found");
		}
	} else {
		res.status(404);
		throw new Error("User not found");
	}
});

export { getAddress, saveAddress, changeAddress };
