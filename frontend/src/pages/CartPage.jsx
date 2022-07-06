import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getProductInfo } from "../features/cart/cartAction";
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
import { useParams, useLocation } from "react-router-dom";

let initialEntrance = true;

function CartPage() {
	const { cartItems } = useSelector((state) => state.cart);
	const { user } = useSelector((state) => state.auth);
	const dispatch = useDispatch();
	const params = useParams();
	const navigate = useNavigate();
	const location = useLocation();
	const qty = location.search ? +location.search.split("=")[1] : 1;
	const itemInfo = {
		productId: params.id,
		qty,
	};

	useEffect(() => {
		if (!initialEntrance) {
			dispatch(getProductInfo(itemInfo));
		}
		initialEntrance = false;
	}, []);

	const removeFromCartHandler = (id) => {
		dispatch(cartSliceAction.removeItemFromCart(id));
	};

	const checkoutHandler = () => {
		if (user) {
			navigate("/shipping");
		} else {
			navigate("/login");
		}
	};

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
							<ListGroup.Item key={item.product}>
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
											value={item.qty}
											onChange={(e) =>
												dispatch(
													cartSliceAction.updateItemQty({
														productId: item.product,
														qty: +e.target.value,
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
											onClick={() => removeFromCartHandler(item.product)}
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
								Subtotal ({cartItems.reduce((acc, item) => acc + item.qty, 0)})
								item
							</h2>
							$
							{cartItems
								.reduce((acc, item) => acc + item.qty * item.price, 0)
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
