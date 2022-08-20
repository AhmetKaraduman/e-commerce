import { createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "./productServices";

// get all products
export const fetchProducts = createAsyncThunk(
	"product/fetchProducts",

	async (pageInfo, thunkAPI) => {
		try {
			return await productServices.getProducts(pageInfo);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get single product
export const fetchProduct = createAsyncThunk(
	"product/fetchProduct",

	async (id, thunkAPI) => {
		try {
			return await productServices.getProduct(id);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// delete product by id
export const deleteProduct = createAsyncThunk(
	"product/deleteProduct",

	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await productServices.deleteProduct(id, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// create product
export const createProduct = createAsyncThunk(
	"product/create",

	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await productServices.createProduct(token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// update product
export const updateProduct = createAsyncThunk(
	"product/update",

	async (info, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await productServices.updateProduct(info, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// create review
export const createReview = createAsyncThunk(
	"product/createReview",

	async (review, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await productServices.createReview(review, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);

// get top products
export const getTopProducts = createAsyncThunk(
	"product/getTopProducts",

	async (_, thunkAPI) => {
		try {
			return await productServices.getTopProducts();
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			return thunkAPI.rejectWithValue(message);
		}
	}
);
