import axios from "axios";

const SINGLE_PRODUCT_API = "/api/products/";

// get info
const getInfo = async (itemInfo) => {
	const { data } = await axios.get(SINGLE_PRODUCT_API + itemInfo.productId);

	return {
		product: data._id,
		name: data.name,
		image: data.image,
		price: data.price,
		countInStock: data.countInStock,
		qty: itemInfo.qty,
	};
};

const cartServices = {
	getInfo,
};

export default cartServices;
