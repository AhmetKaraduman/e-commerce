import { createAsyncThunk } from "@reduxjs/toolkit";
import productServices from "./productServices";

export const fetchProducts = createAsyncThunk(
	"product/fetchProducts",

	async (_, thunkAPI) => {
		try {
			return await productServices.getProducts();
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
