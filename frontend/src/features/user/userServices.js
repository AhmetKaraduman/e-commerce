import axios from "axios";

const USER_URL = "/api/users/";

// get users
const getUsers = async (userInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const { data } = await axios.get(USER_URL, config);

	return data;
};

// get single user detail
const getUserDetail = async (userInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	const { data } = await axios.get(`${USER_URL}${userInfo.id}`, config);
	return data;
};

// delete user
const deleteUser = async ({ id, userInfo }) => {
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};

	await axios.delete(`${USER_URL}${id}`, config);

	const { data } = await axios.get(USER_URL, config);

	return data;
};

// update user
const updateUser = async (userInfo) => {
	const config = {
		headers: {
			Authorization: `Bearer ${userInfo.token}`,
		},
	};
	console.log(userInfo);

	await axios.put(`${USER_URL}${userInfo.id}`, userInfo.user, config);
};

const userServices = {
	getUsers,
	deleteUser,
	getUserDetail,
	updateUser,
};

export default userServices;
