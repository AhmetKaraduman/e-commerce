import { createSlice } from "@reduxjs/toolkit";
import { getUsers, deleteUser, getUserDetail, updateUser } from "./userAction";

const initialState = {
	users: [],
	user: {},
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

const userSlice = createSlice({
	name: "user",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getUsers.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUsers.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getUsers.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.users = action.payload;
			})
			.addCase(deleteUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(deleteUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.users = action.payload;
			})
			.addCase(getUserDetail.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getUserDetail.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(getUserDetail.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(updateUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isError = false;
				state.isSuccess = true;
			});
	},
});

export default userSlice;
export const userSliceAction = userSlice.actions;
