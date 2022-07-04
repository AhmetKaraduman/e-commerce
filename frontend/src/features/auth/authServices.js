import axios from "axios";

const LOGIN_URL = "/api/users/login";
const REGISTER_URL = "api/users";

// login user
const login = async (loginInfo) => {
	const { data } = await axios.post(LOGIN_URL, loginInfo);

	if (data) {
		localStorage.setItem("userInfo", JSON.stringify(data));
	}
	return data;
};

// logout user
const logout = () => {
	localStorage.removeItem("userInfo");
};

// register user
const register = async (registerUserInfo) => {
	const { data } = await axios.post(REGISTER_URL, registerUserInfo);

	if (data) {
		localStorage.setItem("userInfo", JSON.stringify(data));
	}
	return data;
};

const authServices = {
	login,
	logout,
	register,
};

export default authServices;
