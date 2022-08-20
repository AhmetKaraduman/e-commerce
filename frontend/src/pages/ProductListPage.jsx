import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import {
	fetchProducts,
	deleteProduct,
	createProduct,
} from "../features/product/productAction";
import { productSliceAction } from "../features/product/productSlice";
import Paginate from "../components/Paginate";

function ProductListPage() {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const params = useParams();
	const keyword = params.keyword;
	const pageNumber = params.page;

	const productList = useSelector((state) => state.product);
	const {
		products,
		isError,
		isLoading,
		deleteSuccess,
		message,
		createSuccess,
		createdProduct,
		page,
		totalPages,
	} = productList;
	const authUser = useSelector((state) => state.auth);

	useEffect(() => {
		dispatch(productSliceAction.reset());
		if (!authUser.user.isAdmin) {
			navigate("/login");
		}

		if (createSuccess) {
			navigate(`/admin/products/${createdProduct._id}/edit`);
		} else {
			const pageInfo = {
				keyword: keyword || "",
				pageNumber: pageNumber || 1,
			};
			dispatch(fetchProducts(pageInfo));
		}
	}, [dispatch, navigate, authUser, deleteSuccess, createSuccess, pageNumber]);

	const deleteHandler = (id) => {
		dispatch(deleteProduct(id));
	};

	const createProductHandler = () => {
		dispatch(createProduct());
	};

	return (
		<>
			<Row className="aling-items-center">
				<Col>
					<h1>Products</h1>
				</Col>
				<Col className="text-right">
					<Button className="my-3" onClick={createProductHandler}>
						<i className="fas fa-plus"></i>Create Product
					</Button>
				</Col>
			</Row>
			{isError && <Message variant="danger">{message}</Message>}
			{isLoading ? (
				<Loader />
			) : isError ? (
				<Message variant="danger">{isError}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>NAME</th>
							<th>PRICE</th>
							<th>CATEGORY</th>
							<th>BRAND</th>
							<th></th>
						</tr>
					</thead>
					<tbody>
						{products.map((product) => (
							<tr key={product._id}>
								<td>{product._id}</td>
								<td>{product.name}</td>
								<td>${product.price}</td>
								<td>{product.category}</td>
								<td>{product.brand}</td>
								<td>
									<LinkContainer to={`/admin/products/${product._id}/edit`}>
										<Button variant="light" className="btn-sm">
											<i className="fas fa-edit"></i>
										</Button>
									</LinkContainer>
									<Button
										variant="danger"
										className="btn-sm"
										onClick={() => deleteHandler(product._id)}
									>
										<i className="fas fa-trash"></i>
									</Button>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}

			<Paginate
				pages={totalPages}
				page={page}
				keyword={keyword ? keyword : ""}
				isAdmin={true}
			/>
		</>
	);
}

export default ProductListPage;
