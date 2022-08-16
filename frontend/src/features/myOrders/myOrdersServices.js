import axios from "axios";

const GET_ORDERS_URL = "/api/orders/myorders";

// get
const get = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.get(GET_ORDERS_URL, config);
	return data;
};

const myOrderServices = {
	get,
};

export default myOrderServices;
