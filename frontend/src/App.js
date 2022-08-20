import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import ProductPage from "./pages/ProductPage";
import CartPage from "./pages/CartPage";
import { Container } from "react-bootstrap";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProfilePage from "./pages/ProfilePage";
import ShippingPage from "./pages/ShippingPage";
import PaymentPage from "./pages/PaymentPage";
import PlaceOrderPage from "./pages/PlaceOrderPage";
import OrderPage from "./pages/OrderPage";
import UserListPage from "./pages/UserListPage";
import UserEditPage from "./pages/UserEditPage";
import ProductListPage from "./pages/ProductListPage";
import ProductEditPage from "./pages/ProductEditPage";
import OrderListPage from "./pages/OrderListPage";

function App() {
	return (
		<Router>
			<Header />
			<main className="py-3">
				<Container>
					<Routes>
						<Route path="/" element={<HomePage />} />
						<Route path="/search/:keyword" element={<HomePage />} />
						<Route path="/product/:id" element={<ProductPage />} />
						<Route path="/cart">
							<Route path="" element={<CartPage />} />
							<Route path=":id" element={<CartPage />} />
						</Route>
						<Route path="/login" element={<LoginPage />} />
						<Route path="/register" element={<RegisterPage />} />
						<Route path="/profile" element={<ProfilePage />} />
						<Route path="/shipping" element={<ShippingPage />} />
						<Route path="/payment" element={<PaymentPage />} />
						<Route path="/placeorder" element={<PlaceOrderPage />} />
						<Route path="/order/:id" element={<OrderPage />} />
						<Route path="/admin/userList" element={<UserListPage />} />
						<Route path="/admin/user/:id/edit" element={<UserEditPage />} />
						<Route
							path="/admin/products/:id/edit"
							element={<ProductEditPage />}
						/>
						<Route path="/admin/productList" element={<ProductListPage />} />
						<Route path="/admin/orderlist" element={<OrderListPage />} />
					</Routes>
				</Container>
			</main>
			<Footer />
		</Router>
	);
}

export default App;
