import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Button, Row, Col, ListGroup, Image, Card } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Message from "../components/Message";
import CheckoutStep from "../components/CheckoutStep";
import Loader from "../components/Loader";
import { createOrder } from "../features/order/orderAction";
import { orderSliceAction } from "../features/order/orderSlice";

function PlaceOrder() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { cartItems } = useSelector((state) => state.cart);

	let newData = cartItems.map((item) =>
		Object.assign({}, item, { product: item._id, qty: item.quantity })
	);
	const { shippingAddress } = useSelector((state) => state.shipping);
	const { payment } = useSelector((state) => state.payment);
	const { orders, isError, isSuccess, isLoading, message } = useSelector(
		(state) => state.orders
	);

	const addDecimals = (num) => {
		return (Math.round(num * 100) / 100).toFixed(2);
	};

	// calculate prices
	const itemsPrice = addDecimals(
		cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)
	);
	const shippingPrice = addDecimals(itemsPrice < 100 ? 10 : 0);
	const taxPrice = addDecimals(Number((0.18 * itemsPrice).toFixed(2)));
	const totalPrice = addDecimals(
		Number(+itemsPrice + +shippingPrice + +taxPrice)
	);

	useEffect(() => {
		if (isSuccess) {
			navigate(`/order/${orders._id}`);
		}
	}, [isSuccess, navigate, orders]);

	const placeOrderHandler = () => {
		dispatch(
			createOrder({
				orderItems: newData,
				shippingAddress,
				paymentMethod: payment,
				shippingPrice,
				taxPrice,
				totalPrice,
				itemsPrice,
			})
		);

		// setTimeout(() => dispatch(orderSliceAction.reset()), 3000);
	};

	return (
		<>
			<CheckoutStep step1 step2 step3 step4 />
			{isLoading && <Loader />}
			{isError && <Message variant="danger">{message}</Message>}
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Address:</strong> <br />
								{shippingAddress.address} <br />
								{shippingAddress.city}
								<br />
								{shippingAddress.postalCode}
								<br />
								{shippingAddress.country}
								<br />
							</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<strong>Method:</strong>
							<p>{payment}</p>
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{cartItems.lenght === 0 ? (
								<Message> Your cart is empty</Message>
							) : (
								<ListGroup variant="flush">
									{cartItems.map((item, index) => (
										<ListGroup.Item key={index}>
											<Row>
												<Col md={1}>
													<Image
														src={item.image}
														alt={item.name}
														fluid
														rounded
													/>
												</Col>
												<Col>
													<Link to={`/product/${item.product}`}>
														{item.name}
													</Link>
												</Col>
												<Col md={4}>
													{item.quantity} X ${item.price} = $
													{(item.quantity * item.price).toFixed(2)}
												</Col>
											</Row>
										</ListGroup.Item>
									))}
								</ListGroup>
							)}
						</ListGroup.Item>
					</ListGroup>
				</Col>

				<Col md={4}>
					<Card>
						<ListGroup variant="flush">
							<ListGroup.Item>
								<h2>Order Summary</h2>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Items</Col>
									<Col>${itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${taxPrice} (%18)</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Button
									type="button"
									className="btn-block"
									disabled={cartItems === 0}
									onClick={placeOrderHandler}
								>
									Place Order
								</Button>
							</ListGroup.Item>
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	);
}

export default PlaceOrder;
