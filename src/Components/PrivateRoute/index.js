import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";

import UserContext from "./../../Context/Users/UserContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
	const { user: auth } = useContext(UserContext);
	return (
		<Route
			{...rest}
			render={(props) =>
				!!auth ? (
					<Component {...props} />
				) : (
					<Redirect
						to={{ pathname: "/", state: { from: props.location } }}
					/>
				)
			}
		/>
	);
};

export function ProtectedRoute({ component: Component, path }) {
	const { user, userDataPresent } = useContext(UserContext);

	if (userDataPresent) {
		if (user == null) {
			return <Redirect to={"/"}></Redirect>;
		} else {
			return (
				<Route exact path={path}>
					<Component />
				</Route>
			);
		}
	} else {
		return null;
	}
}

export default PrivateRoute;
