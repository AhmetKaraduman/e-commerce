import { createSlice } from "@reduxjs/toolkit";
import { createOrder } from "./orderAction";

const orders = JSON.parse(localStorage.getItem("orders"));

const initialState = {
	orders: orders ? orders : null,
	isSuccess: false,
	isError: false,
	isLoading: false,
	message: null,
};

const orderSlice = createSlice({
	name: "order",
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
			.addCase(createOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			});
	},
});

export default orderSlice;
export const orderSliceAction = orderSlice.actions;
