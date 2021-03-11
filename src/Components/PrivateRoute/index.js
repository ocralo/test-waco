import React, { lazy, Suspense } from "react";
import { Route, Redirect } from "react-router-dom";

import { SesionFirebase } from "./../../helper/SignInFirebase";

const PrivateRoute = ({ component: Component, auth, ...rest }) => {
	return (
		// Show the component only when the user is logged in
		// Otherwise, redirect the user to /signin page
		<Route
			{...rest}
			render={(props) =>
				auth ? (
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

export default PrivateRoute;
