import React, { useState } from "react";
import { Form, Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function SearchBox() {
	const [keyword, setKeyword] = useState("");
	const navigate = useNavigate();

	const submitHandler = (e) => {
		e.preventDefault();
		if (keyword.trim()) {
			navigate(`/search/${keyword}`);
		} else {
			navigate("/");
		}
	};

	return (
		<Form onSubmit={submitHandler}>
			<Row className="align-items-center">
				<Col xs="auto">
					<Form.Control
						type="text"
						name="q"
						onChange={(e) => setKeyword(e.target.value)}
						className="mb-2"
						id="inlineFormInput"
						placeholder="Search for products.."
					/>
				</Col>
				<Col xs="auto">
					<Button type="submit" variant="outline-success" className="mb-2">
						Search
					</Button>
				</Col>
			</Row>
		</Form>
	);
}

export default SearchBox;
