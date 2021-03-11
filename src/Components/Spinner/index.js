import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(9),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
	centerGrid: {
		display: "flex",
		justifyContent: "center",
		alignItems: "center",
		flexFlow: "column",
	},
}));

export default function Spinner() {
	const classes = useStyles();

	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}>
				<Grid container spacing={9}>
					<Grid item xs={12} className={classes.centerGrid}>
						<CircularProgress />
						<Typography>Loading...</Typography>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
}
