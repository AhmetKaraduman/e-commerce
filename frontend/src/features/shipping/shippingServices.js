import axios from "axios";

const SHIPPING_ADDRESS_URL = "/api/shippingaddress";

// save address
const save = async (addressInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${addressInfo.token}`,
		},
	};

	const { data } = await axios.post(SHIPPING_ADDRESS_URL, addressInfo, config);

	return data;
};

// get address
const get = async (userInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const { data } = await axios.get(SHIPPING_ADDRESS_URL, config);

	return data;
};

// update address
const update = async (addressInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${addressInfo.token}`,
		},
	};

	const { data } = await axios.put(SHIPPING_ADDRESS_URL, addressInfo, config);

	return data;
};

const shippingServices = {
	save,
	get,
	update,
};

export default shippingServices;
