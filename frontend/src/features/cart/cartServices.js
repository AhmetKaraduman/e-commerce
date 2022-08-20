import axios from "axios";

const CART_URL = "/api/carts/";

// get cart items
const getCartItem = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.get(CART_URL, config);

	return data;
};

// delete cart item
const deleteCartItem = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.delete(`${CART_URL}${id}`, config);
};

// create cart item
const createCartItem = async (itemInfo, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.post(CART_URL, itemInfo, config);
};

const cartServices = {
	getCartItem,
	deleteCartItem,
	createCartItem,
};

export default cartServices;
