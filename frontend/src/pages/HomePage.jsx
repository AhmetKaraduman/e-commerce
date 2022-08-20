import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../features/product/productAction";
import { Row, Col } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";

function HomePage() {
	const params = useParams();
	const keyword = params.keyword;
	const pageNumber = params.page;
	const { products, isLoading, isError, message, page, totalPages } =
		useSelector((state) => state.product);
	const dispatch = useDispatch();

	useEffect(() => {
		const pageInfo = {
			keyword: keyword || "",
			pageNumber: pageNumber || 1,
		};
		dispatch(fetchProducts(pageInfo));
	}, [dispatch, keyword, pageNumber]);

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <Message variant="danger">{message}</Message>;
	}
	return (
		<>
			{!keyword && <ProductCarousel />}
			<h1>Latest Products</h1>
			<Row>
				{products.map((product) => (
					<Col key={product._id} sm={12} md={6} lg={4} xl={3}>
						<Product product={product} />
					</Col>
				))}
			</Row>

			<Paginate
				pages={totalPages}
				page={page}
				keyword={keyword ? keyword : ""}
			/>
		</>
	);
}

export default HomePage;
