import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
	Row,
	Col,
	Image,
	ListGroup,
	Card,
	Button,
	Form,
} from "react-bootstrap";
import Rating from "../components/Rating";
import { useParams, useNavigate } from "react-router-dom";
import { fetchProduct } from "../features/product/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";

function ProductPage() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { product, isLoading, message, isError } = useSelector(
		(state) => state.product
	);
	const [qty, setQty] = useState(1);

	useEffect(() => {
		dispatch(fetchProduct(params.id));
	}, [params.id, dispatch]);

	const addToCartHandler = () => {
		navigate(`/cart/${params.id}?qty=${qty}`);
	};

	if (isLoading) {
		return <Loader></Loader>;
	}

	if (isError) {
		return <Message variant="danger">{message}</Message>;
	}

	return (
		<>
			<Link className="btn btn-light my-3" to="/">
				Go Back
			</Link>
			<Row>
				<Col md={6}>
					<Image src={product.image} alt={product.name} fluid />
				</Col>
				<Col md={3}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h3>{product.name}</h3>
						</ListGroup.Item>
						<ListGroup.Item>
							{product.rating && (
								<Rating
									value={product.rating}
									text={`${product.numReviews} reviews`}
								/>
							)}
						</ListGroup.Item>
						<ListGroup.Item>Price: ${product.price}</ListGroup.Item>
						<ListGroup.Item>{product.description}</ListGroup.Item>
					</ListGroup>
				</Col>
				<Col md={3}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<Row>
									<Col>Price:</Col>
									<Col>
										<strong>${product.price}</strong>
									</Col>
								</Row>
							</ListGroup.Item>

							<ListGroup.Item>
								<Row>
									<Col>Status:</Col>
									<Col>
										{product.countInStock > 0 ? "In Stock" : "Out Of Stock"}
									</Col>
								</Row>
							</ListGroup.Item>

							{product.countInStock > 0 && (
								<ListGroup.Item>
									<Row>
										<Col>Qty</Col>
										<Col>
											<Form.Control
												as="select"
												value={qty}
												onChange={(e) => setQty(e.target.value)}
											>
												{[...Array(product.countInStock).keys()].map((x) => (
													<option key={x + 1} value={x + 1}>
														{" "}
														{x + 1}
													</option>
												))}
											</Form.Control>
										</Col>
									</Row>
								</ListGroup.Item>
							)}

							<ListGroup.Item>
								<Button
									onClick={addToCartHandler}
									className="btn-block"
									type="button"
									disabled={product.countInStock === 0}
								>
									Add To Cart
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default ProductPage;
