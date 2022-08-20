import axios from "axios";

const ORDER_URL = "/api/orders";

// createOrder
const createOrder = async (order, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};
	const { data } = await axios.post(ORDER_URL, order, config);
	return data;
};

// getOrder
const getOrder = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(ORDER_URL + `/${id}`, config);
	return data;
};

// get all orders
const fetchAllOrder = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(ORDER_URL, config);
	return data;
};

// update order
const updateToDelivered = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(ORDER_URL + `/${id}/deliver`, {}, config);
	return data;
};

const orderServices = {
	createOrder,
	getOrder,
	fetchAllOrder,
	updateToDelivered,
};

export default orderServices;
