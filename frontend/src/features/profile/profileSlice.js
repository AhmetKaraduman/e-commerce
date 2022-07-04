import { createSlice } from "@reduxjs/toolkit";
import { updateProfile } from "./profileAction";
import { loginUser, logoutUser, registerUser } from "../auth/authAction";

const user = JSON.parse(localStorage.getItem("userInfo"));

const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

const profileSlice = createSlice({
	name: "profile",
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
			.addCase(updateProfile.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateProfile.rejected, (state, action) => {
				state.isError = true;
				state.message = action.payload;
				state.isLoading = false;
			})
			.addCase(updateProfile.fulfilled, (state, action) => {
				state.isError = false;
				state.isSuccess = true;
				state.isLoading = false;
				state.user = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.user = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});

export default profileSlice;
export const profileSliceAction = profileSlice.actions;
