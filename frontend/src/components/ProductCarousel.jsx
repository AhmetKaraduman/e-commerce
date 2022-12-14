import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Carousel, Image } from "react-bootstrap";
import { getTopProducts } from "../features/product/productAction";
import { useSelector, useDispatch } from "react-redux";

function ProductCarousel() {
	const dispacth = useDispatch();
	const { topProducts } = useSelector((state) => state.product);

	useEffect(() => {
		dispacth(getTopProducts());
	}, [dispacth]);
	return (
		<Carousel pause="hover" className="bg-dark">
			{topProducts.map((product) => (
				<Carousel.Item key={product._id}>
					<Link to={`/product/${product._id}`}>
						<Image src={product.image} alt={product.name} fluid />
						<Carousel.Caption className="carousel-caption">
							<h2>
								{product.name}(${product.price})
							</h2>
						</Carousel.Caption>
					</Link>
				</Carousel.Item>
			))}
		</Carousel>
	);
}

export default ProductCarousel;
