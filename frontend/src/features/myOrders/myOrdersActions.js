import { createAsyncThunk } from "@reduxjs/toolkit";
import myOrderSliceServices from "./myOrdersServices";

// get my orders
export const getMyOrders = createAsyncThunk(
	"order/getMyOrders",

	async (_, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			return await myOrderSliceServices.get(token);
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
