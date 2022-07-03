import { createAsyncThunk } from "@reduxjs/toolkit";
import cartServices from "./cartServices";

export const getProductInfo = createAsyncThunk(
	"cart/getIfnfo",

	async (itemInfo, thunkAPI) => {
		try {
			return await cartServices.getInfo(itemInfo);
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
