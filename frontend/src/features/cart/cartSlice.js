import { createSlice } from "@reduxjs/toolkit";
import { getCartItem, deleteCartItem, createCartItem } from "./cartAction";

const initialState = {
	cartItems: [],
	isLoading: false,
	isSuccess: false,
	isError: false,
	isDeleteSuccess: false,
	isCreateSuccess: false,
	message: "",
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = null;
			state.isDeleteSuccess = false;
			state.isCreateSuccess = false;
			state.cartItems = [];
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getCartItem.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.cartItems = action.payload;
			})
			.addCase(deleteCartItem.pending, (state) => {
				state.isLoading = true;
				state.isDeleteSuccess = false;
			})
			.addCase(deleteCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isDeleteSuccess = true;
			})
			.addCase(createCartItem.pending, (state) => {
				state.isLoading = true;
				state.isCreateSuccess = false;
			})
			.addCase(createCartItem.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createCartItem.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.isCreateSuccess = true;
			});
	},
});

export default cartSlice;
export const cartSliceAction = cartSlice.actions;
