import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { registerUser } from "../features/auth/authAction";
import { authSliceAction } from "../features/auth/authSlice";
import FormContainer from "../components/FormContainer";

function RegisterPage() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [name, setName] = useState("");
	const [message, setMessage] = useState(null);

	const dispatch = useDispatch();
	const { isLoading, isSuccess, isError, user } = useSelector(
		(state) => state.auth
	);

	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (!email || !password || !name) {
			setMessage("Please fill all fields ");
		} else {
			if (password === confirmPassword) {
				dispatch(registerUser({ email, password, name }));
			} else {
				setMessage("Password do not match");
			}
		}
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
				Can not Register. Please{" "}
				<Link to="/register" onClick={() => dispatch(authSliceAction.reset())}>
					try again.
				</Link>
			</Message>
		);
	}

	return (
		<FormContainer>
			<h1>Sign Up</h1>
			{message && <Message variant="danger">{message}</Message>}
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
					Register
				</Button>
			</Form>

			<Row className="py-3">
				<Col>
					Have an account? <Link to="/login">Login</Link>
				</Col>
			</Row>
		</FormContainer>
	);
}

export default RegisterPage;
