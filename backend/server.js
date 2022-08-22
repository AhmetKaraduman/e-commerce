import path from "path";
import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import morgan from "morgan";
import productRoutes from "./routes/productRoutes.js";
import userRouters from "./routes/userRoutes.js";
import shippingAddressRoutes from "./routes/shippingAddressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

if (process.env.NODE_ENV === "development") {
	app.use(morgan("dev"));
}

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// route for products
app.use("/api/products", productRoutes);
// route for users
app.use("/api/users", userRouters);
// route for shipping address
app.use("/api/shippingaddress", shippingAddressRoutes);
// route for order
app.use("/api/orders", orderRouter);
// route for upload
app.use("/api/upload", uploadRoutes);
// route for cart
app.use("/api/carts", cartRoutes);

// get config for paypal
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

// make a folder static
const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname, "/uploads")));

// For production adjustment
if (process.env.NODE_ENV === "production") {
	app.use(express.static(path.join(__dirname, "/frontend/build")));

	app.get("*", (req, res) =>
		res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
	);
} else {
	// API route
	app.get("/", (req, res) => {
		res.send("API is running....");
	});
}

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
