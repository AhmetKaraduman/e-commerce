import { createSlice } from "@reduxjs/toolkit";
import { orderPay } from "./payAction";

const initialState = {
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: null,
};

const paySlice = createSlice({
	name: "pay",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isSuccess = false;
			state.isError = false;
			state.isLoading = false;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(orderPay.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(orderPay.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(orderPay.fulfilled, (state) => {
				state.isLoading = false;
				state.isSuccess = true;
			});
	},
});

export default paySlice;
export const paySliceAction = paySlice.actions;
