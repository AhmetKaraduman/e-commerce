import asyncHandler from "express-async-handler";
import Cart from "../models/cartModel.js";

// @desc   Create new cart
// @route  POST /api/carts
// @access Private
const createCart = asyncHandler(async (req, res) => {
	const { name, description, price, quantity, image } = req.body;

	if (!quantity || !name || !description || !price || !image) {
		res.status(400);
		throw new Error("No item selected");
	} else {
		const cart = new Cart({
			user: req.user._id,
			name,
			description,
			price,
			quantity,
			image,
		});

		const createdCart = await cart.save();

		res.status(201).json(createdCart);
	}
});

// @desc   get cart
// @route  GET api/carts
// @access Private
const getCart = asyncHandler(async (req, res) => {
	const cart = await Cart.find({ user: req.user._id });

	if (cart) {
		res.json(cart);
	} else {
		res.status(404);
		throw new Error("Cart nof found");
	}
});

// @desc   update cart
// @route  PUT api/carts/:id
// @access Private
const updateCart = asyncHandler(async (req, res) => {
	const { name, description, price, quantity, image } = req.body;

	const cart = await Cart.findById(req.params.id);

	if (cart) {
		(cart.name = name),
			(cart.description = description),
			(cart.price = price),
			(cart.quantity = quantity),
			(cart.image = image);

		const updatedCart = await cart.save();
		res.json(updatedCart);
	} else {
		res.status(404);
		throw new Error("Cart not found");
	}
});

// @desc   delete cart
// @route  DELETE api/carts/:id
// @access Private
const deleteCart = asyncHandler(async (req, res) => {
	const cart = await Cart.findById(req.params.id);

	if (JSON.stringify(cart.user) == JSON.stringify(req.user._id)) {
		if (cart) {
			await cart.remove();
			res.json({ message: "Cart Removed" });
		} else {
			res.status(404);
			throw new Error("Cart not found");
		}
	} else {
		res.status(401);
		throw new Error("Unauthorized request");
	}
});

export { createCart, getCart, updateCart, deleteCart };
