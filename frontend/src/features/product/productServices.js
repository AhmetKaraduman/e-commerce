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

// delete product by id
const deleteProduct = async (id, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.delete(PRODUCTS_API + `/${id}`, config);
};

// create product
const createProduct = async (token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.post(PRODUCTS_API, {}, config);

	return data;
};

// update product
const updateProduct = async (info, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	const { data } = await axios.put(
		PRODUCTS_API + `/${info.id}`,
		info.updatedProduct,
		config
	);

	return data;
};

const productServices = {
	getProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
};

export default productServices;
