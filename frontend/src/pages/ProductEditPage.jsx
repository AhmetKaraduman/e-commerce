import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useParams } from "react-router-dom";
import FormContainer from "../components/FormContainer";
import { fetchProduct, updateProduct } from "../features/product/productAction";

function ProductEditPage() {
	const params = useParams();
	const productId = params.id;
	const [name, setName] = useState("");
	const [price, setPrice] = useState(0);
	const [image, setImage] = useState("");
	const [brand, setBrand] = useState("");
	const [category, setCategory] = useState("");
	const [countInStock, setCountInStock] = useState(0);
	const [description, setDescription] = useState("");

	const { isLoading, isError, product, updateSuccess } = useSelector(
		(state) => state.product
	);
	const { user: authedUser } = useSelector((state) => state.auth);

	const dispatch = useDispatch();
	const navigate = useNavigate();

	useEffect(() => {
		if (updateSuccess) {
			navigate("/admin/productlist");
		}

		if (!product.name || product._id !== productId) {
			dispatch(fetchProduct(productId));
		} else {
			setName(product.name);
			setPrice(product.price);
			setImage(product.image);
			setCategory(product.category);
			setBrand(product.brand);
			setCountInStock(product.countInStock);
			setDescription(product.description);
		}
	}, [dispatch, productId, product._id, updateSuccess]);

	const submitHandler = async (e) => {
		e.preventDefault();
		const info = {
			id: productId,
			updatedProduct: {
				name,
				price,
				image,
				brand,
				category,
				countInStock,
				description,
			},
		};
		dispatch(updateProduct(info));
	};

	if (isLoading) {
		return <Loader />;
	}

	return (
		<>
			<Link to="/admin/productlist" className="btn btn-light my-3">
				Go Back
			</Link>
			<FormContainer>
				<h1>Edit Product</h1>

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

						<Form.Group controlId="price">
							<Form.Label>Price</Form.Label>
							<Form.Control
								type="number"
								placeholder="Enter price"
								value={price}
								onChange={(e) => setPrice(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />

						<Form.Group controlId="image">
							<Form.Label>Image</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter image url"
								value={image}
								onChange={(e) => setImage(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />

						<Form.Group controlId="brand">
							<Form.Label>Brand</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter brand"
								value={brand}
								onChange={(e) => setBrand(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />

						<Form.Group controlId="Category">
							<Form.Label>Category</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Category"
								value={category}
								onChange={(e) => setCategory(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />

						<Form.Group controlId="countInStock">
							<Form.Label>CountInStock</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter countInStock"
								value={countInStock}
								onChange={(e) => setCountInStock(e.target.value)}
							></Form.Control>
						</Form.Group>
						<br />

						<Form.Group controlId="description">
							<Form.Label>Description</Form.Label>
							<Form.Control
								type="text"
								placeholder="Enter Description url"
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							></Form.Control>
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

export default ProductEditPage;
