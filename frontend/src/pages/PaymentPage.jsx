import React, { useState } from "react";
import { Form, Button, Col } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import CheckoutStep from "../components/CheckoutStep";
import { paymentSliceAction } from "../features/payment/paymentSlice";

function PaymentPage() {
	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { shippingAddress } = useSelector((state) => state.shipping);

	const [paymentMethod, setPaymentMethod] = useState("PayPal");

	const submitHandler = (e) => {
		e.preventDefault();
		dispatch(paymentSliceAction.savePaymentMethod(paymentMethod));
		navigate("/placeorder");
	};

	if (!shippingAddress) {
		navigate("/shipping");
	}
	return (
		<FormContainer>
			<CheckoutStep step1 step2 step3 />
			<h1>Payment Method</h1>
			<Form onSubmit={submitHandler}>
				<Form.Group>
					<Form.Label as="legend">Select Method</Form.Label>
					<Col>
						<Form.Check
							type="radio"
							label="PayPal or Credit Card"
							id="Paypal"
							name="paymentMethod"
							value="PayPal"
							checked
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>

						<Form.Check
							type="radio"
							label="Stripe"
							id="Stripe"
							name="paymentMethod"
							value="Stripe"
							onChange={(e) => setPaymentMethod(e.target.value)}
						></Form.Check>
					</Col>
				</Form.Group>

				<Button className="paymentContinue" type="submit" variant="primary">
					Continue
				</Button>
			</Form>
		</FormContainer>
	);
}

export default PaymentPage;
