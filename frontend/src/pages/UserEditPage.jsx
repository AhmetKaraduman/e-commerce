import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import { authSliceAction } from "../features/auth/authSlice";
import FormContainer from "../components/FormContainer";
import { getUserDetail, updateUser } from "../features/user/userAction";

function UserEditPage() {
	const params = useParams();
	const userId = params.id;
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [isAdmin, setIsAdmin] = useState(false);

	const { isLoading, isError, user } = useSelector((state) => state.users);
	const { user: authedUser } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		dispatch(
			getUserDetail({
				id: userId,
				token: authedUser.token,
			})
		);

		setName(user.name);
		setEmail(user.email);
		setIsAdmin(user.isAdmin);
	}, [dispatch, user.name, user.email, user.isAdmin]);

	const submitHandler = async (e) => {
		e.preventDefault();
		const userInfo = {
			token: authedUser.token,
			user: {
				name,
				email,
				isAdmin,
			},
			id: userId,
		};
		console.log(userInfo);
		await dispatch(updateUser(userInfo));
		navigate("/admin/userList");
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Link to="/admin/userlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit User</h1>

				{isLoading ? (
					<Loader />
				) : isError ? (
					<Message variant="danger">{isError}</Message>
				) : (
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
						<br />
						<Form.Group controlId="email">
							<Form.Label>Email Address</Form.Label>
							<Form.Control
								type="email"
								placeholder="Enter E-mail"
								value={email}
								onChange={(e) => setEmail(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />
						<Form.Group controlId="isadmin">
							<Form.Check
								type="checkbox"
								label="Is Admin"
								value={isAdmin}
								checked={isAdmin}
								onChange={(e) => setIsAdmin(e.target.checked)}
							></Form.Check>
						</Form.Group>
						<br />
						<Button type="submit" variant="primary">
							Update
						</Button>
					</Form>
				)}
			</FormContainer>
		</>
	);
}

export default UserEditPage;
