import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { loginUser } from "../features/auth/authAction";
import { authSliceAction } from "../features/auth/authSlice";
import FormContainer from "../components/FormContainer";

function LoginPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const dispatch = useDispatch();
	const { isLoading, isSuccess, isError, user } = useSelector(
		(state) => state.auth
	);

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(loginUser({ email, password }));
	};

	useEffect(() => {
		if (user) {
			navigate("/");
		}
	}, [user]);

	if (isSuccess) {
		setTimeout(() => dispatch(authSliceAction.reset()), 3000);
	}

	if (isLoading) {
		return <Loader />;
	}

	if (isError) {
		return (
			<Message variant="danger">
				Can not login. Please{" "}
				<Link to="/login" onClick={() => dispatch(authSliceAction.reset())}>
					try again
				</Link>{" "}
				.
			</Message>
		);
	}

	return (
		<FormContainer>
			<h1>Sign In</h1>
			<Form onSubmit={submitHandler}>
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
						placeholder="Enter E-mail"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button type="submit" variant="primary">
					Sign In
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					New Customer? <Link to="/register">Register</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default LoginPage;
