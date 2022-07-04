import express from "express";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import colors from "colors";
import productRoutes from "./routes/productRoutes.js";
import userRouters from "./routes/userRoutes.js";
import { notFound, errorHandler } from "./middleware/errorMiddleware.js";

dotenv.config();

connectDB();

const app = express();

// body parser
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// creating a route
app.get("/", (req, res) => {
	res.send("API is running....");
});

// route for products
app.use("/api/products", productRoutes);
// route for users
app.use("/api/users", userRouters);

app.use(errorHandler);
app.use(notFound);

const PORT = process.env.PORT || 5000;

app.listen(
	PORT,
	console.log(
		`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
	)
);
