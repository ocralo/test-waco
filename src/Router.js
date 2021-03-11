import React, { Suspense, useContext, useEffect } from "react";
import {
	BrowserRouter as Router,
	Switch,
	Route,
	Redirect,
} from "react-router-dom";

//import pages
import Login from "./Pages/Login";
import SingUp from "./Pages/SignUp";
import DashBoard from "./Pages/DashBoard";

//import components
import Navbar from "./Components/Navbar";
import PrivateRoute from "./Components/PrivateRoute";
import Spinner from "./Components/Spinner";

//import context
import UserState from "./Context/Users/UserState";
import UserContext from "./Context/Users/UserContext";

function App() {
	return (
		<UserState>
			<RouterPagesProtected />
		</UserState>
	);
}

const RouterPagesProtected = () => {
	const { userDataPresent, getUser, user } = useContext(UserContext);

	useEffect(() => {
		getUser();
	}, []);

	return (
		<>
			{userDataPresent ? (
				<Router>
					<div>
						<Navbar></Navbar>
						{
							<Suspense fallback={<Spinner />}>
								<Switch>
									<PrivateRoute component={DashBoard} path="/home" exact />
									<Route exact path="/singup">
										<SingUp />
									</Route>
									{!!!user ? (
										<Route exact path="/">
											<Login />
										</Route>
									) : (
										<Redirect to="/home" />
									)}
								</Switch>
							</Suspense>
						}
					</div>
				</Router>
			) : (
				<Spinner />
			)}
		</>
	);
};

App.propTypes = {};

export default App;
