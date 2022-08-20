import React, { useEffect, useState } from "react";
import axios from "axios";
import { PayPalButton } from "react-paypal-button-v2";
import { Link } from "react-router-dom";
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { getOrderById, updateToDelivered } from "../features/order/orderAction";
import { orderPay } from "../features/pay/payAction";
import { paySliceAction } from "../features/pay/paySlice";

function OrderPage() {
	const dispatch = useDispatch();
	const { id } = useParams();

	const [sdkReady, setSdkReady] = useState(false);
	const { orders, isError, isSuccess, isLoading, message, isUpdateSuccess } =
		useSelector((state) => state.orders);
	const pay = useSelector((state) => state.pay);
	const { user } = useSelector((state) => state.auth);

	useEffect(() => {
		const addPayPalScript = async () => {
			const { data: clientId } = await axios.get("/api/config/paypal");
			const script = document.createElement("script");
			script.type = "text/javascript";
			script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
			script.async = true;
			script.onload = () => {
				setSdkReady(true);
			};
			document.body.appendChild(script);
		};

		addPayPalScript();

		if (!orders || pay.isSuccess) {
			dispatch(paySliceAction.reset());
			dispatch(getOrderById(id));
		} else if (!orders.isPaid) {
			if (!window.paypal) {
				addPayPalScript();
			} else {
				setSdkReady(true);
			}
		}
	}, [id, pay.isSuccess, dispatch, orders]);

	useEffect(() => {
		dispatch(getOrderById(id));
	}, [dispatch, id]);

	const successPaymentHandler = (paymentResult) => {
		dispatch(orderPay({ id, paymentResult }));
	};

	const deliverHandler = () => {
		dispatch(updateToDelivered(id));
	};

	return isLoading ? (
		<Loader />
	) : isError ? (
		<Message variant="danger">{message}</Message>
	) : isSuccess ? (
		<>
			<h1>Order {orders._id}</h1>
			<Row>
				<Col md={8}>
					<ListGroup variant="flush">
						<ListGroup.Item>
							<h2>Shipping</h2>
							<p>
								<strong>Name: </strong> {orders.user.name}
							</p>
							<p>
								<strong>Email: </strong>{" "}
								<a href={`mailto:${orders.user.email}`}>{orders.user.email}</a>
							</p>
							<p>
								<strong>Address:</strong> {orders.shippingAddress.address},{" "}
								{orders.shippingAddress.city},{" "}
								{orders.shippingAddress.postalCode},{" "}
								{orders.shippingAddress.country},
							</p>
							{orders.isDelivered ? (
								<Message variant="success">
									Delivered on {orders.deliveredAt}
								</Message>
							) : (
								<Message variant="danger">Not Delivered</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Payment Method</h2>
							<p>
								<strong>Method:</strong> {orders.paymentMethod}
							</p>
							{orders.isPaid ? (
								<Message variant="success">Paid on {orders.paidAt}</Message>
							) : (
								<Message variant="danger">Not Paid</Message>
							)}
						</ListGroup.Item>

						<ListGroup.Item>
							<h2>Order Items</h2>
							{orders.orderItems.lenght === 0 ? (
								<Message> Order is empty</Message>
							) : (
								<ListGroup variant="flush">
									{orders.orderItems.map((item, index) => (
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
													{item.qty} X ${item.price} = ${item.qty * item.price}
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
									<Col>${orders.itemsPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Shipping</Col>
									<Col>${orders.shippingPrice}</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Tax</Col>
									<Col>${orders.taxPrice} (%18)</Col>
								</Row>
							</ListGroup.Item>
							<ListGroup.Item>
								<Row>
									<Col>Total</Col>
									<Col>${orders.totalPrice}</Col>
								</Row>
							</ListGroup.Item>
							{!orders.isPaid && (
								<ListGroup.Item>
									{pay.isLoading && <Loader />}
									{!sdkReady ? (
										<Loader />
									) : (
										<PayPalButton
											amount={orders.totalPrice}
											onSuccess={successPaymentHandler}
										/>
									)}
								</ListGroup.Item>
							)}

							{user.isAdmin && !orders.isDelivered && (
								<ListGroup.Item>
									<Button
										type="button"
										className="btn btn-block"
										onClick={deliverHandler}
									>
										Mark as Delivered
									</Button>
								</ListGroup.Item>
							)}
						</ListGroup>
					</Card>
				</Col>
			</Row>
		</>
	) : (
		<></>
	);
}

export default OrderPage;
