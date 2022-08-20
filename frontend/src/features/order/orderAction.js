import { createAsyncThunk } from "@reduxjs/toolkit";
import orderServices from "./orderServices";

// create order
export const createOrder = createAsyncThunk(
	"order/create",

	async (order, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderServices.createOrder(order, token);
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

// get order details
export const getOrderById = createAsyncThunk(
	"order/getOrder",

	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderServices.getOrder(id, token);
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

// get all orders
export const fetchAllOrder = createAsyncThunk(
	"order/fetchAllOrder",

	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderServices.fetchAllOrder(token);
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

// update delived
export const updateToDelivered = createAsyncThunk(
	"order/update",

	async (id, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await orderServices.updateToDelivered(id, token);
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
