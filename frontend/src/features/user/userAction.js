import { createAsyncThunk } from "@reduxjs/toolkit";
import userServices from "./userServices";

// get users
export const getUsers = createAsyncThunk(
	"users/get",

	async (userInfo, thunkAPI) => {
		try {
			return await userServices.getUsers(userInfo);
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

// get user detail
export const getUserDetail = createAsyncThunk(
	"users/getSingle",

	async (userInfo, thunkAPI) => {
		try {
			return await userServices.getUserDetail(userInfo);
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

// delete user
export const deleteUser = createAsyncThunk(
	"users/delete",

	async (info, thunkAPI) => {
		try {
			return await userServices.deleteUser(info);
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

// update user
export const updateUser = createAsyncThunk(
	"user/update",

	async (userInfo, thunkAPI) => {
		try {
			console.log(userInfo);
			return await userServices.updateUser(userInfo);
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
