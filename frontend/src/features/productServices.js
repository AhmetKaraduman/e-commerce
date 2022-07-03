import axios from "axios";

const PRODUCTS_API = "/api/products";

// fetch all products
const getProducts = async () => {
	const response = await axios.get(PRODUCTS_API);

	return response.data;
};

// fetch a single product
const getProduct = async (id) => {
	const response = await axios.get(PRODUCTS_API + `/${id}`);

	return response.data;
};

const productServices = {
	getProducts,
	getProduct,
};

export default productServices;
