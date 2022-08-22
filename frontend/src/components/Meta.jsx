import React from "react";
import { Helmet } from "react-helmet";

function Meta({ title, description, keywords }) {
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="keyword" content={keywords} />
		</Helmet>
	);
}

Meta.defaultProps = {
	title: "Welcome To Proshop",
	keywords: "electronics, buy electronics, cheap electronics",
	description: "We sell the best products for cheat",
};

export default Meta;
