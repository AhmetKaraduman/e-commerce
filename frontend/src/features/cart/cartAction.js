import { createAsyncThunk } from "@reduxjs/toolkit";
import cartServices from "./cartServices";

// get cart items
export const getCartItem = createAsyncThunk(
	"cart/getItem",

	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await cartServices.getCartItem(token);
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

// delete cart item
export const deleteCartItem = createAsyncThunk(
	"cart/deleteItem",

	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await cartServices.deleteCartItem(id, token);
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

// create cart item
export const createCartItem = createAsyncThunk(
	"cart/createItem",

	async (itemInfo, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await cartServices.createCartItem(itemInfo, token);
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
