import { configureStore } from "@reduxjs/toolkit";
import productSlice from "./features/productSlice";

export const store = configureStore({
	reducer: {
		product: productSlice.reducer,
	},
});

// import { createStore, combineReducer, applyMiddleware } from "@reduxjs/toolkit"
// import thunk from "redux-thunk"

// const reducer = combineReducer({})
// const initialState = {}

// const store = createStore(reducer, initialState)
