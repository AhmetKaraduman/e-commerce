import React from "react";
import { Pagination } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function Paginate({ pages, page, keyword = "", isAdmin = false }) {
	return (
		pages > 1 && (
			<Pagination>
				{[...Array(pages).keys()].map((x) => (
					<LinkContainer
						key={x + 1}
						to={
							!isAdmin
								? keyword
									? `/search/${keyword}/page/${x + 1}`
									: `/page/${x + 1}`
								: `/admin/productList/${x + 1}`
						}
					>
						<Pagination.Item active={page === x + 1} activeLabel="">
							{x + 1}
						</Pagination.Item>
					</LinkContainer>
				))}
			</Pagination>
		)
	);
}

export default Paginate;
