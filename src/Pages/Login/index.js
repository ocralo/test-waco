import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import { LoginWithEmail } from "./../../helper/SignInFirebase";

import WacoLogo from "./../../Assets/Img/waco.png";

const useStyles = makeStyles((theme) => ({
	constinerLogin: {
		minHeight: "100%",
	},
	paper: {
		marginTop: theme.spacing(12),
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
		marginTop: theme.spacing(1),
	},
	submit: {
		margin: theme.spacing(3, 0, 2),
	},
}));

export default function SignIn() {
	const [userEmail, setUserEmail] = useState({});
	const classes = useStyles();
	let history = useHistory();

	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		setUserEmail({ ...userEmail, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!!userEmail.email && !!userEmail.password) {
			LoginWithEmail(userEmail.email, userEmail.password)
				.then((user) => {
					// Signed in
					console.log(user);
					history.push("/home");
				})
				.catch((error) => {
					var errorCode = error.code;
					var errorMessage = error.message;
					// ..
				});
		}
	};

	return (
		<Container
			component="main"
			maxWidth="xs"
			className={classes.constinerLogin}>
			<CssBaseline />
			<div className={classes.paper}>
				<img src={WacoLogo} alt="waco identity" />

				<Typography component="h1" variant="h5">
					Log in
				</Typography>
				<form className={classes.form} onSubmit={handleSubmit}>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						id="email"
						label="Email Address"
						name="email"
						type="email"
						autoComplete="email"
						autoFocus
						onChange={handleInputChange}
					/>
					<TextField
						variant="outlined"
						margin="normal"
						required
						fullWidth
						name="password"
						label="Password"
						type="password"
						id="password"
						autoComplete="current-password"
						onChange={handleInputChange}
					/>
					<Button
						type="submit"
						fullWidth
						variant="contained"
						color="primary"
						className={classes.submit}>
						Sign In
					</Button>
					<Grid container>
						<Grid item>
							<Link onClick={() => history.push("/singup")} variant="body2">
								{"Don't have an account? Sign Up"}
							</Link>
						</Grid>
					</Grid>
				</form>
			</div>
		</Container>
	);
}
