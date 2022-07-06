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

const orderServices = {
	createOrder,
};

export default orderServices;
