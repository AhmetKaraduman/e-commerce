import React from "react";
import PropTypes from "prop-types";

function Rating(props) {
	return (
		<div className="rating">
			<span>
				<i
					style={{ color: props.color }}
					className={
						props.value >= 1
							? "fa-solid fa-star"
							: props.value >= 0.5
							? "fa-regular fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>
				<i
					style={{ color: props.color }}
					className={
						props.value >= 2
							? "fa-solid fa-star"
							: props.value >= 1.5
							? "fa-regular fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
				<span></span>
				<i
					style={{ color: props.color }}
					className={
						props.value >= 3
							? "fa-solid fa-star"
							: props.value >= 2.5
							? "fa-regular fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
				<span></span>
				<i
					style={{ color: props.color }}
					className={
						props.value >= 4
							? "fa-solid fa-star"
							: props.value >= 3.5
							? "fa-regular fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
				<span></span>
				<i
					style={{ color: props.color }}
					className={
						props.value >= 5
							? "fa-solid fa-star"
							: props.value >= 4.5
							? "fa-regular fa-star-half-stroke"
							: "fa-regular fa-star"
					}
				></i>
			</span>
			<span>{props.text ? props.text : ""}</span>
		</div>
	);
}

Rating.defaultProps = {
	color: "#f8e825",
};

Rating.propTypes = {
	value: PropTypes.number.isRequired,
	text: PropTypes.string.isRequired,
	color: PropTypes.string,
};

export default Rating;
