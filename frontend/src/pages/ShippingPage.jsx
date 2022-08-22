import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { shippingSliceAction } from "../features/shipping/shippingSlice";
import CheckoutStep from "../components/CheckoutStep";
import { saveAddress, getAddress } from "../features/shipping/shippingAction";

function ShippingPage() {
	const { user } = useSelector((state) => state.auth);
	const { shippingAddress, isLoading, isSuccess, isError, message } =
		useSelector((state) => state.shipping);
	const [address, setAddress] = useState("");
	const [city, setCity] = useState("");
	const [postalCode, setPostalCode] = useState(0);
	const [country, setCountry] = useState("");
	const [comMessage, setComMessage] = useState(null);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (shippingAddress) {
			setAddress(shippingAddress.address);
			setCity(shippingAddress.city);
			setPostalCode(shippingAddress.postalCode);
			setCountry(shippingAddress.country);
		} else {
			const userInfo = {
				token: user.token,
			};
			dispatch(getAddress(userInfo));
			setTimeout(() => dispatch(shippingSliceAction.reset()), 3000);
		}
	}, [shippingAddress, dispatch, user.token]);

	const submitHandler = (e) => {
		e.preventDefault();

		if (!user) {
			navigate("/login");
		} else {
			if (!address || !city || !postalCode || !country) {
				setComMessage("Please fill all fields");
				setTimeout(() => setComMessage(null), 3000);
			} else {
				dispatch(
					shippingSliceAction.takeAddress({
						email: user.email,
						address,
						city,
						postalCode,
						country,
					})
				);
				localStorage.setItem(
					"userAddress",
					JSON.stringify({
						email: user.email,
						address,
						city,
						postalCode,
						country,
					})
				);
				navigate("/payment");
			}
		}
	};

	const saveContinue = () => {
		if (!user) {
			navigate("/login");
		} else {
			dispatch(
				saveAddress({
					email: user.email,
					address,
					city,
					postalCode,
					country,
					token: user.token,
				})
			);
			setTimeout(() => dispatch(shippingSliceAction.reset()), 3000);
			if (isSuccess) {
				setComMessage("Your Address Saved");
				setTimeout(() => dispatch(shippingSliceAction.reset()), 3000);
				setTimeout(() => setComMessage(null), 3000);
				setTimeout(() => navigate("/payment"), 4000);
			}
		}
	};

	return (
		<FormContainer>
			<CheckoutStep step1 step2 />
			<h1>Shipping</h1>
			{comMessage && <Message variant="danger">{comMessage}</Message>}
			<Form onSubmit={submitHandler}>
				<Form.Group controlId="address">
					<Form.Label>Address</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Address"
						value={address}
						onChange={(e) => setAddress(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="city">
					<Form.Label>City</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter City"
						value={city}
						onChange={(e) => setCity(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="postalCode">
					<Form.Label>Postal Code</Form.Label>
					<Form.Control
						type="number"
						placeholder="Enter Postal Code"
						value={postalCode}
						onChange={(e) => setPostalCode(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Form.Group controlId="country">
					<Form.Label>Country</Form.Label>
					<Form.Control
						type="text"
						placeholder="Enter Country"
						value={country}
						onChange={(e) => setCountry(e.target.value)}
					></Form.Control>
				</Form.Group>

				<Button className="shippingButton" type="submit" variant="primary">
					Continue without saving
				</Button>

				{isLoading && <Loader />}
				{isError && <Message variant="danger">{message}</Message>}
				<Button
					className="shippingButton save"
					type="button"
					variant="secondary"
					onClick={saveContinue}
				>
					Save my address and continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default ShippingPage;
