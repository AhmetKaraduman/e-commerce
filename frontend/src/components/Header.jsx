import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container } from "react-bootstrap";

function Header() {
	return (
		<header>
			<Navbar bg="dark" variant="dark" expand="md" collapseOnSelect>
				<Container>
					<LinkContainer to="/">
						<Navbar.Brand>ProShop</Navbar.Brand>
					</LinkContainer>
					<Navbar.Toggle aria-controls="basic-navbar-nav" />
					<Navbar.Collapse id="basic-navbar-nav">
						<Nav className="ml-auto">
							<LinkContainer to="/cart">
								<Nav.Link active={false}>
									<i className="fas fa-shopping-cart" /> Cart
								</Nav.Link>
							</LinkContainer>
							<LinkContainer to="/login">
								<Nav.Link active={false}>
									<i className="fas fa-user" /> Sign In
								</Nav.Link>
							</LinkContainer>
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
