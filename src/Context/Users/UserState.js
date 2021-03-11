import React, { useReducer } from "react";

import UserReducer from "./UserReducer";
import UserContext from "./UserContext";
import { GET_USERS, LOGOUT_USERS, LOGIN_USERS } from "./../Types";

import {
	SesionFirebase,
	LogoutFirebase,
	LoginWithEmail,
} from "./../../helper/SignInFirebase";

const UserState = ({ children }) => {
	const InitialState = {
		user: null,
		userDataPresent: false,
	};

	const [state, dispatch] = useReducer(UserReducer, InitialState);

	const getUser = async () => {
		const authSesion = await SesionFirebase();
		dispatch({
			type: GET_USERS,
			payload: authSesion,
			userDataPresent: true,
		});
		console.log("getUser", authSesion);
	};

	const logoutUser = async () => {
		const logoutSesion = await LogoutFirebase();

		if (logoutSesion) {
			dispatch({
				type: LOGOUT_USERS,
				payload: null,
			});
		} else {
			dispatch({
				type: LOGOUT_USERS,
				payload: state.user,
			});
		}
		console.log("logout", logoutSesion);
	};

	const logintUser = async (email, password) => {
		console.log(email, password);
		LoginWithEmail(email, password)
			.then((user) => {
				// Signed in
				const uid = { uid: user.uid, email: user.email };
				dispatch({
					type: LOGIN_USERS,
					payload: uid,
				});
			})
			.catch((error) => {
				/* var errorCode = error.code;
					var errorMessage = error.message; */
				// ..
			});
	};

	return (
		<UserContext.Provider
			value={{
				user: state.user,
				userDataPresent: state.userDataPresent,
				getUser,
				logoutUser,
				logintUser,
			}}>
			{children}
		</UserContext.Provider>
	);
};

export default UserState;
