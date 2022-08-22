import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteCartItem, getCartItem } from "../features/cart/cartAction";
import { cartSliceAction } from "../features/cart/cartSlice";
import Message from "../components/Message";
import {
	Row,
	Col,
	ListGroup,
	Image,
	Form,
	Button,
	Card,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function CartPage() {
	const { cartItems, isDeleteSuccess, isCreateSuccess, isLoading } =
		useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(getCartItem());
	}, [isDeleteSuccess, isCreateSuccess, dispatch]);

	const removeItemFromCart = (id) => {
		dispatch(deleteCartItem(id));
	};

	const checkoutHandler = () => {
		if (user) {
			navigate("/shipping");
		} else {
			navigate("/login");
		}
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Row>
			<Col md={8}>
				<h1>Shopping Cart</h1>
				{cartItems.length === 0 ? (
					<Message>
						Your cart is empty <Link to="/">Go Back</Link>{" "}
					</Message>
				) : (
					<ListGroup variant="flush">
						{cartItems.map((item) => (
							<ListGroup.Item key={item._id}>
								<Row>
									<Col md={2}>
										<Image src={item.image} alt={item.name} fluid rounded />
									</Col>
									<Col md={3}>
										<Link to={`/product/${item.product}`}>{item.name}</Link>
									</Col>
									<Col md={2}>${item.price}</Col>
									<Col md={2}>
										<Form.Control
											as="select"
											value={item.quantity}
											onChange={(e) =>
												dispatch(
													cartSliceAction.updateItemQty({
														productId: item.product,
														quantity: +e.target.value,
													})
												)
											}
										>
											{[...Array(item.countInStock).keys()].map((x) => (
												<option key={x + 1} value={x + 1}>
													{" "}
													{x + 1}
												</option>
											))}
										</Form.Control>
									</Col>
									<Col md={2}>
										<Button
											type="button"
											variant="light"
											onClick={() => removeItemFromCart(item._id)}
										>
											<i className="fas fa-trash"></i>
										</Button>
									</Col>
								</Row>
							</ListGroup.Item>
						))}
					</ListGroup>
				)}
			</Col>
			<Col md={4}>
				<Card>
					<ListGroup>
						<ListGroup.Item variant="flush">
							<h2>
								Subtotal (
								{cartItems.reduce((acc, item) => acc + item.quantity, 0)}) item
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.quantity * item.price, 0)
								.toFixed(2)}
						</ListGroup.Item>
						<ListGroup.Item>
							<Button
								type="button"
								className="btn-block"
								disabled={cartItems.length === 0}
								onClick={checkoutHandler}
							>
								Proceed To Checkout
							</Button>
						</ListGroup.Item>
					</ListGroup>
				</Card>
			</Col>
		</Row>
	);
}

export default CartPage;
