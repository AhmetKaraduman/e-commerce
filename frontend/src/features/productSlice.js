import { createSlice } from "@reduxjs/toolkit";
import { fetchProducts, fetchProduct } from "./productAction";

const initialState = {
	products: [],
	product: {},
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
};

export const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = "";
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchProducts.pending, (state) => {
				state.isLoading = true;
				state.message = "Fetching...";
			})
			.addCase(fetchProducts.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchProducts.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.products = action.payload;
				state.message = "";
			})
			.addCase(fetchProduct.pending, (state) => {
				state.isLoading = true;
				state.message = "Fetching...";
			})
			.addCase(fetchProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(fetchProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.product = action.payload;
				state.message = "";
			});
	},
});

export default productSlice;
export const productSliceAction = productSlice.actions;
