import { createSlice } from "@reduxjs/toolkit";
import { getMyOrders } from "./myOrdersActions";

const initialState = {
	orders: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: null,
};

const myOrderSlice = createSlice({
	name: "myOrders",
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
			.addCase(getMyOrders.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getMyOrders.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getMyOrders.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			});
	},
});

export default myOrderSlice;
export const myOrderSliceAction = myOrderSlice.actions;
