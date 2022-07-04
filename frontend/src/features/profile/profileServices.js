import axios from "axios";

const UPDATE_USER_URL = "/api/users/profile";

const update = async (updatedUser) => {
	const config = {
		headers: {
			Authorization: `Bearer ${updatedUser.token}`,
		},
	};

	let user;
	if (updatedUser.password) {
		user = {
			name: updatedUser.name,
			email: updatedUser.email,
			password: updatedUser.password,
		};
	} else {
		user = {
			name: updatedUser.name,
			email: updatedUser.email,
		};
	}

	const { data } = await axios.put(UPDATE_USER_URL, user, config);

	return data;
};

const profileServices = {
	update,
};

export default profileServices;
