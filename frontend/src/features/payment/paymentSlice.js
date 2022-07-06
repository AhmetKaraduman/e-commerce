import { createSlice } from "@reduxjs/toolkit";

const payment = JSON.parse(localStorage.getItem("paymentMethod"));

const initialState = {
	payment: payment ? payment : null,
};

const paymentSlice = createSlice({
	name: "payment",
	initialState: initialState,
	reducers: {
		savePaymentMethod: (state, action) => {
			state.payment = action.payload;
		},
	},
});

export default paymentSlice;
export const paymentSliceAction = paymentSlice.actions;
