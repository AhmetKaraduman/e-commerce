import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logoutUser } from "../features/auth/authAction";
import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";

function Header() {
	const { user } = useSelector((state) => state.auth);

	const dispatch = useDispatch();

	const logoutHandler = () => {
		dispatch(logoutUser());
	};

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
							{user ? (
								<NavDropdown title={user.name} id="username">
									<LinkContainer to="/profile">
										<NavDropdown.Item active={false}>Profile</NavDropdown.Item>
									</LinkContainer>
									<LinkContainer to="/">
										<NavDropdown.Item onClick={logoutHandler} active={false}>
											Logout
										</NavDropdown.Item>
									</LinkContainer>
								</NavDropdown>
							) : (
								<LinkContainer to="/login">
									<Nav.Link active={false}>
										<i className="fas fa-user" /> Sign In
									</Nav.Link>
								</LinkContainer>
							)}
						</Nav>
					</Navbar.Collapse>
				</Container>
			</Navbar>
		</header>
	);
}

export default Header;
