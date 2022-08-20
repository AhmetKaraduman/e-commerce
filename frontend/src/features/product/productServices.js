import axios from "axios";

const PRODUCTS_API = "/api/products";

// fetch all products
const getProducts = async (pageInfo) => {
	const response = await axios.get(
		PRODUCTS_API +
			`?keyword=${pageInfo.keyword}&pageNumber=${pageInfo.pageNumber}`
	);

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

// create review
const createReview = async (review, token) => {
	const config = {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	};

	await axios.post(PRODUCTS_API + `/${review.id}/reviews`, review, config);
};

// get top products
const getTopProducts = async () => {
	const { data } = await axios.get(`${PRODUCTS_API}/top`);
	return data;
};

const productServices = {
	getProducts,
	getProduct,
	deleteProduct,
	createProduct,
	updateProduct,
	createReview,
	getTopProducts,
};

export default productServices;
