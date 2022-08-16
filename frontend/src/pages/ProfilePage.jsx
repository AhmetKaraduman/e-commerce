import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { LinkContainer } from "react-router-bootstrap";
import { Form, Button, Row, Col, Table } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { authSliceAction } from "../features/auth/authSlice";
import { updateProfile } from "../features/profile/profileAction";
import { profileSliceAction } from "../features/profile/profileSlice";
import { getMyOrders } from "../features/myOrders/myOrdersActions";
import { myOrderSliceAction } from "../features/myOrders/myOrdersSlice";

function ProfilePage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [comMessage, setComMessage] = useState(null);

	const dispatch = useDispatch();
	const { isLoading, isSuccess, isError, user, message } = useSelector(
		(state) => state.auth
	);
	const myOrders = useSelector((state) => state.myOrders);

	const profileStates = useSelector((state) => state.profile);

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (password === confirmPassword) {
			if (password) {
				dispatch(
					updateProfile({
						name,
						email,
						password,
						token: user.token,
					})
				);
				setTimeout(() => dispatch(profileSliceAction.reset()), 3000);
			} else {
				dispatch(
					updateProfile({
						name,
						email,
						token: user.token,
					})
				);
				setTimeout(() => dispatch(profileSliceAction.reset()), 3000);
			}
		} else {
			setComMessage("Password do not match");
			setTimeout(
				() => (dispatch(authSliceAction.reset()), setComMessage(null)),
				3000
			);
		}
	};

	useEffect(() => {
		if (!user) {
			navigate("/login");
		} else {
			dispatch(getMyOrders());
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	useEffect(() => {
		if (myOrders.isSuccess) {
			dispatch(myOrderSliceAction.reset());
		}

		if (isSuccess || isError) {
			setTimeout(() => dispatch(authSliceAction.reset()), 3000);
		}
	}, [myOrders.isSuccess, isSuccess, isError]);

	if (isLoading) {
		return <Loader />;
	}

	return (
		<Row>
			<Col md={3}>
				<h2>Profile</h2>
				{comMessage && <Message variant="danger">{comMessage}</Message>}
				{isError && <Message variant="danger">{message}</Message>}
				{profileStates.isSuccess && (
					<Message variant="success">Profile Updated</Message>
				)}
				{profileStates.isLoading && <Loader />}
				<Form onSubmit={submitHandler}>
					<Form.Group controlId="name">
						<Form.Label>Name</Form.Label>
						<Form.Control
							type="name"
							placeholder="Enter Name"
							value={name}
							onChange={(e) => setName(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="email">
						<Form.Label>Email Address</Form.Label>
						<Form.Control
							type="email"
							placeholder="Enter E-mail"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="password">
						<Form.Label>Password</Form.Label>
						<Form.Control
							type="password"
							placeholder="Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Form.Group controlId="confirmPassword">
						<Form.Label>Confirm Password</Form.Label>
						<Form.Control
							type="Password"
							placeholder="Confirm Password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
						></Form.Control>
					</Form.Group>

					<Button type="submit" variant="primary">
						Update
					</Button>
				</Form>
			</Col>

			<Col md={9}>
				<h2>My orders</h2>
				{myOrders.isLoading ? (
					<Loader />
				) : myOrders.isError ? (
					<Message variant="danger">{myOrders.message}</Message>
				) : (
					<Table striped bordered hover responsive className="table-sm">
						<thead>
							<tr>
								<th>ID</th>
								<th>DATE</th>
								<th>TOTAL</th>
								<th>PAID</th>
								<th>DELIVERED</th>
								<th></th>
							</tr>
						</thead>
						<tbody>
							{myOrders.orders.map((order) => (
								<tr key={order._id}>
									<td>{order._id}</td>
									<td>{order.createdAt.substring(0, 10)}</td>
									<td>${order.totalPrice}</td>
									<td>
										{order.isPaid ? (
											order.paidAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										{order.isDelivered ? (
											order.deliveredAt.substring(0, 10)
										) : (
											<i className="fas fa-times" style={{ color: "red" }}></i>
										)}
									</td>
									<td>
										<LinkContainer to={`/order/${order._id}`}>
											<Button variant="light" className="btn-sm">
												Details
											</Button>
										</LinkContainer>
									</td>
								</tr>
							))}
						</tbody>
					</Table>
				)}
			</Col>
		</Row>
	);
}

export default ProfilePage;
