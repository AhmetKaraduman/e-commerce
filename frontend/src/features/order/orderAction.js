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
