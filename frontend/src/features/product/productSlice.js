import { createSlice } from "@reduxjs/toolkit";
import {
	fetchProducts,
	fetchProduct,
	deleteProduct,
	createProduct,
	updateProduct,
	createReview,
} from "./productAction";

const initialState = {
	products: [],
	product: { reviews: [] },
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: "",
	deleteSuccess: false,
	createSuccess: false,
	updateSuccess: false,
	createReviewSuccess: false,
	createReviewError: false,
	reviewMessage: "",
	createdProduct: {},
};

export const productSlice = createSlice({
	name: "product",
	initialState: initialState,
	reducers: {
		reset: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.deleteSuccess = false;
			state.createSuccess = false;
			state.updateSuccess = false;
			state.createReviewSuccess = false;
			state.createReviewError = false;
			state.message = "";
			state.reviewMessage = "";
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
			})
			.addCase(deleteProduct.pending, (state) => {
				state.isLoading = true;
				state.deleteSuccess = false;
			})
			.addCase(deleteProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(deleteProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.deleteSuccess = true;
			})
			.addCase(createProduct.pending, (state) => {
				state.isLoading = true;
				state.createSuccess = false;
				state.createdProduct = {};
			})
			.addCase(createProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(createProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.createSuccess = true;
				state.createdProduct = action.payload;
			})
			.addCase(updateProduct.pending, (state) => {
				state.isLoading = true;
				state.updateSuccess = false;
			})
			.addCase(updateProduct.rejected, (state, action) => {
				state.isLoading = false;
				state.isError = true;
				state.message = action.payload;
			})
			.addCase(updateProduct.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.updateSuccess = true;
				state.product = action.payload;
			})
			.addCase(createReview.pending, (state) => {
				state.createReviewSuccess = false;
				state.createReviewError = false;
			})
			.addCase(createReview.rejected, (state, action) => {
				state.createReviewSuccess = false;
				state.createReviewError = true;
				state.reviewMessage = action.payload;
			})
			.addCase(createReview.fulfilled, (state) => {
				state.createReviewSuccess = true;
				state.createReviewError = false;
			});
	},
});

export default productSlice;
export const productSliceAction = productSlice.actions;
