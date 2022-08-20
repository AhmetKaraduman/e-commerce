import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productAction";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";

function HomePage() {
	const params = useParams();
	const keyword = params.keyword;
	const { products, isLoading, isError, message } = useSelector(
		(state) => state.product
	);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchProducts(keyword));
	}, [dispatch, keyword]);

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <Message variant="danger">{message}</Message>;
	}
	return (
		<>
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>
		</>
	);
}

export default HomePage;
