import React, { useEffect, useState, lazy, Suspense } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//import pages
import Login from "./Pages/Login";
import SingUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";

//import components
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import Spinner from "./Components/Spinner";

import { SesionFirebase } from "./helper/SignInFirebase";

function App() {
	const [auth, setAuth] = useState(null);

	useEffect(() => {
		const asyncFunction = async () => {
			const authSesion = await SesionFirebase();
			console.log(authSesion);
			setAuth(await authSesion);
		};
		asyncFunction();
	}, []);

	return (
		<Router>
			<div>
				<Navbar auth={auth}></Navbar>
				{
					<Suspense fallback={<Spinner />}>
						<Switch>
							<PrivateRoute auth component={DashBoard} path="/home" exact />
							<Route exact path="/singup">
								<SingUp />
							</Route>
							<Route exact path="/">
								<Login />
							</Route>
						</Switch>
					</Suspense>
				}
			</div>
		</Router>
	);
}

App.propTypes = {};

export default App;
