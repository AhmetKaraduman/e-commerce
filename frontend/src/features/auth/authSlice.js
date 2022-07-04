import { createSlice } from "@reduxjs/toolkit";
import { loginUser, logoutUser, registerUser } from "./authAction";

const user = JSON.parse(localStorage.getItem("userInfo"));
const initialState = {
	user: user ? user : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: "",
};

export const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(registerUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(registerUser.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
			})
			.addCase(logoutUser.fulfilled, (state, action) => {
				state.user = null;
			});
	},
});

export default authSlice;
export const authSliceAction = authSlice.actions;
