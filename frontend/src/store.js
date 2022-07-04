import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/product/productSlice";
import cartSlice from "./features/cart/cartSlice";
import authSlice from "./features/auth/authSlice";
import profileSlice from "./features/profile/profileSlice";

export const store = configureStore({
	reducer: {
		product: productSlice.reducer,
		cart: cartSlice.reducer,
		auth: authSlice.reducer,
		profile: profileSlice.reducer,
	},
});

// import { createStore, combineReducer, applyMiddleware } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"

// const reducer = combineReducer({})
// const initialState = {}

// const store = createStore(reducer, initialState)
