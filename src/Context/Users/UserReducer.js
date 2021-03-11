import { GET_USERS, LOGOUT_USERS, LOGIN_USERS } from "./../Types";

const UserReducer = (state, action) => {
	const { type, payload, userDataPresent } = action;

	switch (type) {
		case GET_USERS:
			return {
				...state,
				user: payload,
				userDataPresent,
			};

		case LOGOUT_USERS:
			return {
				...state,
				user: payload,
			};

		case LOGIN_USERS:
			return {
				...state,
				user: payload,
			};

		default:
			return { ...state };
	}
};

export default UserReducer;
