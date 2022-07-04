import { createAsyncThunk } from "@reduxjs/toolkit";
import profileServices from "./profileServices";

export const updateProfile = createAsyncThunk(
	"profile/update",

	async (updatedUser, thunkAPI) => {
		try {
			return await profileServices.update(updatedUser);
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
