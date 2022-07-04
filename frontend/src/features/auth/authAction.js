import { createAsyncThunk } from "@reduxjs/toolkit";
import authServices from "./authServices";

// login user
export const loginUser = createAsyncThunk(
	"auth/login",

	async (loginInfo, thunkAPI) => {
		try {
			return await authServices.login(loginInfo);
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

// logout user
export const logoutUser = createAsyncThunk(
	"auth/logout",

	async () => {
		authServices.logout();
	}
);

// register new user
export const registerUser = createAsyncThunk(
	"auth/register",

	async (registerUserInfo, thunkAPI) => {
		try {
			return await authServices.register(registerUserInfo);
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
