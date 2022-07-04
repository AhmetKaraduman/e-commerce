import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { authSliceAction } from "../features/auth/authSlice";
import { updateProfile } from "../features/profile/profileAction";
import { profileSliceAction } from "../features/profile/profileSlice";

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
			setName(user.name);
			setEmail(user.email);
		}
	}, [user]);

	if (isSuccess || isError) {
		setTimeout(() => dispatch(authSliceAction.reset()), 3000);
	}

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
			</Col>
		</Row>
	);
}

export default ProfilePage;
