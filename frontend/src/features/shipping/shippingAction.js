import { createAsyncThunk } from "@reduxjs/toolkit";
import shippingServices from "./shippingServices";

// get address
export const getAddress = createAsyncThunk(
	"shipping/get",

	async (userInfo, thunkAPI) => {
		try {
			return await shippingServices.get(userInfo);
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

// save address
export const saveAddress = createAsyncThunk(
	"shipping/save",

	async (addressInfo, thunkAPI) => {
		try {
			return await shippingServices.save(addressInfo);
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

// update address
export const updateAddress = createAsyncThunk(
	"shipping/update",

	async (addressInfo, thunkAPI) => {
		try {
			return await shippingServices.update(addressInfo);
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
