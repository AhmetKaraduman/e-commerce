import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";

const protect = asyncHandler(async (req, res, next) => {
	let token;

	if (
		req.headers.authorization &&
		req.headers.authorization.startsWith("Bearer")
	) {
		try {
			// get token from req
			token = req.headers.authorization.split(" ")[1];
			// verify token
			const decode = jwt.verify(token, process.env.JWT_SECRET);
			// get user from token
			req.user = await User.findById(decode.id).select("-password");

			next();
		} catch (error) {
			res.status(401);
			throw new Error("Not1 Authorized");
		}
	}

	if (!token) {
		res.status(401);
		throw new Error("Not2 Authorized");
	}
});

const admin = (req, res, next) => {
	if (req.user && req.user.isAdmin) {
		next();
	} else {
		res.status(401);
		throw new Error("Not authorized as an admin");
	}
};

export { protect, admin };
