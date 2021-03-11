import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import { useHistory, Link } from "react-router-dom";

import { CreateUserWithEmail } from "./../../helper/SignInFirebase";

import WacoLogo from "./../../Assets/Img/waco.png";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(9),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	avatar: {
		margin: theme.spacing(1),
		backgroundColor: theme.palette.secondary.main,
	},
	form: {
		width: "100%", // Fix IE 11 issue.
		marginTop: theme.spacing(3),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
	link: { color: "#3f51b5" },
}));

export default function SignUp() {
	const [newUser, setNewUser] = useState({});

	const classes = useStyles();

	let history = useHistory();

	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		setNewUser({ ...newUser, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			!!newUser.email &&
			!!newUser.password &&
			newUser.firstName &&
			newUser.lastName
		) {
			CreateUserWithEmail(newUser.email, newUser.password)
				.then((user) => {
					// Signed in
					user
						.updateProfile({
							displayName: `${newUser.firstName} ${newUser.lastName}`,
						})
						.then(
							function () {
								// Update successful.
								history.push("/");
							},
							function (error) {
								// An error happened.
							}
						);
					console.log(user);
				})
				.catch((error) => {
					/* var errorCode = error.code;
					var errorMessage = error.message; */
					// ..
				});
		}
	};

	return (
		<Container component="main" maxWidth="xs">
			<CssBaseline />
			<div className={classes.paper}>
				<img src={WacoLogo} alt="waco identity" />
				<Typography component="h1" variant="h5">
					Sign up
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit} noValidate>
					<Grid container spacing={2}>
						<Grid item xs={12} sm={6}>
							<TextField
								autoComplete="fname"
								name="firstName"
								variant="outlined"
								required
								fullWidth
								id="firstName"
								label="First Name"
								autoFocus
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12} sm={6}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="lastName"
								label="Last Name"
								name="lastName"
								autoComplete="lname"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								id="email"
								label="Email Address"
								name="email"
								autoComplete="email"
								onChange={handleInputChange}
							/>
						</Grid>
						<Grid item xs={12}>
							<TextField
								variant="outlined"
								required
								fullWidth
								name="password"
								label="Password"
								type="password"
								id="password"
								autoComplete="current-password"
								onChange={handleInputChange}
							/>
						</Grid>
					</Grid>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Sign Up
					</Button>
					<Grid container justify="flex-end">
						<Grid item>
							<Link
								className={classes.link}
								onClick={() => history.push("/")}
								variant="body2">
								Already have an account? Sign in
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
