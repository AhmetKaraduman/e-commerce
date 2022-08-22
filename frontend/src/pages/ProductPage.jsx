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
import { fetchProduct, createReview } from "../features/product/productAction";
import Loader from "../components/Loader";
import Message from "../components/Message";
import { createCartItem } from "../features/cart/cartAction";
import { productSliceAction } from "../features/product/productSlice";
import Meta from "../components/Meta";

function ProductPage() {
	const params = useParams();
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const {
		product,
		isLoading,
		message,
		isError,
		createReviewError,
		createReviewSuccess,
		reviewMessage,
	} = useSelector((state) => state.product);
	const { user } = useSelector((state) => state.auth);
	const { name, price, image, description } = product;
	const [qty, setQty] = useState(1);
	const [rating, setRating] = useState(0);
	const [comment, setComment] = useState("");

	useEffect(() => {
		if (createReviewSuccess) {
			alert("Review Submitted!");
			setRating(0);
			setComment("");
			dispatch(productSliceAction.reset());
		}
		dispatch(fetchProduct(params.id));
	}, [params.id, dispatch, createReviewSuccess]);

	const addToCartHandler = () => {
		const cartInfo = {
			name,
			price,
			image,
			description,
			quantity: qty,
			_id: params.id,
		};

		dispatch(createCartItem(cartInfo));

		navigate(`/cart/${params.id}?qty=${qty}`);
	};

	const submitHandler = (e) => {
		e.preventDefault();

		if (!rating) {
			throw new Error("Please rate.");
		} else {
			const review = {
				id: params.id,
				rating,
				comment,
			};
			dispatch(createReview(review));
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return <Message variant="danger">{message}</Message>;
	}

	return (
		<>
			<Meta
				title={product.name}
				description={product.description}
				keywords={product.name}
			/>
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

			{product ? (
				<Row>
					<Col md={6}>
						<h2>Reviews</h2>
						{product && product?.reviews.length === 0 && (
							<Message>No Reviews</Message>
						)}
						<ListGroup variant="flush">
							{product.reviews.map((review) => (
								<ListGroup.Item key={review._id}>
									<strong>{review.name}</strong>
									<Rating value={review.rating} text={""} />
									<p>{review.createdAt.substring(0, 10)}</p>
									<p>{review.comment}</p>
								</ListGroup.Item>
							))}
							<br />
							<h1>Write a Customer Review</h1>
							{createReviewError && (
								<Message variant="danger">{reviewMessage}</Message>
							)}
							<ListGroup.Item>
								{user ? (
									<Form onSubmit={submitHandler}>
										<Form.Group controlId="rating">
											<Form.Label>Rating</Form.Label>
											<Form.Control
												as="select"
												value={rating}
												onChange={(e) => setRating(e.target.value)}
											>
												<option value={""}>Select...</option>
												<option value={"1"}>1 - Poor</option>
												<option value={"2"}>2 - Fair</option>
												<option value={"3"}>3 - Good</option>
												<option value={"4"}>4 - Very Good</option>
												<option value={"5"}>5 - Excellent</option>
											</Form.Control>
										</Form.Group>
										<Form.Group controlId="comment">
											<Form.Label>Comment</Form.Label>
											<Form.Control
												as="textarea"
												row="3"
												value={comment}
												onChange={(e) => setComment(e.target.value)}
											></Form.Control>
										</Form.Group>
										<Button type="submit" variant="primary">
											Submit
										</Button>
									</Form>
								) : (
									<Message>
										{" "}
										Please <Link to="/login">sign in</Link> to write a review
									</Message>
								)}
							</ListGroup.Item>
						</ListGroup>
					</Col>
				</Row>
			) : (
				<></>
			)}
		</>
	);
}

export default ProductPage;
