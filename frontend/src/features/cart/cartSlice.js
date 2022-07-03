import { createSlice } from "@reduxjs/toolkit";
import { getProductInfo } from "./cartAction";

const cartItemFromLocalStorage = localStorage.getItem("cartItems")
	? JSON.parse(localStorage.getItem("cartItems"))
	: [];
const initialState = {
	cartItems: cartItemFromLocalStorage,
	isLoading: false,
	isSuccess: false,
	isError: false,
	message: "",
};

export const cartSlice = createSlice({
	name: "cart",
	initialState: initialState,
	reducers: {
		updateItemQty(state, action) {
			let productIndex;
			productIndex = state.cartItems.findIndex(
				(item) => item.product === action.payload.productId
			);
			state.cartItems[productIndex].qty = action.payload.qty;
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
		removeItemFromCart(state, action) {
			state.cartItems = state.cartItems.filter(
				(item) => item.product !== action.payload
			);
			localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(getProductInfo.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getProductInfo.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getProductInfo.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				let itemIndex = state.cartItems.findIndex(
					(item) => item.product === action.payload.product
				);
				if (itemIndex === -1) {
					state.cartItems.push(action.payload);
				} else {
					state.cartItems[itemIndex].qty =
						state.cartItems[itemIndex].qty + action.payload.qty;
				}
				localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
			});
	},
});

export default cartSlice;
export const cartSliceAction = cartSlice.actions;
