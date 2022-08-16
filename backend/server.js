import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRouters from "./routes/userRoutes.js";
import shippingAddressRoutes from "./routes/shippingAddressRoutes.js";
import orderRouter from "./routes/orderRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// API route
app.get("/", (req, res) => {
	res.send("API is running....");
});

// route for products
app.use("/api/products", productRoutes);
// route for users
app.use("/api/users", userRouters);
// route for shipping address
app.use("/api/shippingaddress", shippingAddressRoutes);
// route for order
app.use("/api/orders", orderRouter);

// get config for paypal
app.get("/api/config/paypal", (req, res) =>
	res.send(process.env.PAYPAL_CLIENT_ID)
);

app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
