import axios from "axios";

const ORDER_URL = "/api/orders";

// paid
const paid = async (id, paymentResult, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		ORDER_URL + `/${id}/pay`,
		paymentResult,
		config
	);

	return data;
};

const payServices = {
	paid,
};

export default payServices;
