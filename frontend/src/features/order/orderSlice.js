import { createSlice } from "@reduxjs/toolkit";
import {
	createOrder,
	getOrderById,
	fetchAllOrder,
	updateToDelivered,
} from "./orderAction";

const orders = JSON.parse(localStorage.getItem("orders"));

const initialState = {
	orders: orders ? orders : null,
	allOrders: [],
	isSuccess: false,
	isError: false,
	isLoading: false,
	isUpdateSuccess: false,
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
			state.isUpdateSuccess = false;
			state.message = null;
			state.allOrders = [];
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
			})
			.addCase(getOrderById.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getOrderById.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getOrderById.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.orders = action.payload;
			})
			.addCase(fetchAllOrder.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(fetchAllOrder.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(fetchAllOrder.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.allOrders = action.payload;
			})
			.addCase(updateToDelivered.pending, (state) => {
				state.isLoading = true;
				state.isUpdateSuccess = false;
			})
			.addCase(updateToDelivered.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
			})
			.addCase(updateToDelivered.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isUpdateSuccess = true;
				state.orders = action.payload;
			});
	},
});

export default orderSlice;
export const orderSliceAction = orderSlice.actions;
