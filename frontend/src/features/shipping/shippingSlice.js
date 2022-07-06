import { createSlice } from "@reduxjs/toolkit";
import { saveAddress, getAddress, updateAddress } from "./shippingAction";

const shippingAddress = JSON.parse(localStorage.getItem("userAddress"));

const initialState = {
	shippingAddress: shippingAddress ? shippingAddress : null,
	isError: false,
	isSuccess: false,
	isLoading: false,
	message: null,
};

const shippingSlice = createSlice({
	name: "shipping",
	initialState: initialState,
	reducers: {
		takeAddress: (state, action) => {
			state.shippingAddress = action.payload;
			// state.shippingAddress.address = action.payload.address;
			// state.shippingAddress.city = action.payload.city;
			// state.shippingAddress.postalCode = action.payload.postalCode;
			// state.shippingAddress.country = action.payload.country;
			// state.shippingAddress.email = action.payload.email;
		},
		reset: (state) => {
			state.isError = false;
			state.isSuccess = false;
			state.isLoading = false;
			state.message = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(saveAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(saveAddress.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(saveAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.shippingAddress = action.payload;
			})
			.addCase(getAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(getAddress.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(getAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.shippingAddress = action.payload;
			})
			.addCase(updateAddress.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(updateAddress.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateAddress.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.shippingAddress = action.payload;
			});
	},
});

export default shippingSlice;
export const shippingSliceAction = shippingSlice.actions;
