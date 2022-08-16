import { createAsyncThunk } from "@reduxjs/toolkit";
import payServices from "./payServices";

// payOrder
export const orderPay = createAsyncThunk(
	"order/pay",

	async ({ id, paymentResult }, thunkAPI) => {
		try {
			const token = thunkAPI.getState().auth.user.token;
			console.log(token);
			return await payServices.paid(id, paymentResult, token);
		} catch (error) {
			const message =
				(error.response &&
					error.response.data &&
					error.response.data.message) ||
				error.message ||
				error.toString();

			console.log(message);
			return thunkAPI.rejectWithValue(message);
		}
	}
);
