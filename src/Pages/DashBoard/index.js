import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Paper from "@material-ui/core/Paper";

import Table from "./../../Components/Table";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(12),
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
	},
}));

export default function Dashboard() {
	const classes = useStyles();
	return (
		<Container component="main" maxWidth="md">
			<CssBaseline />
			<div className={classes.paper}>
				<Grid container spacing={12}>
					{/* Recent Orders */}
					<Grid item xs={12}></Grid>
					<Grid item xs={12}>
						<Paper className={classes.paper}>
							<Table />
						</Paper>
					</Grid>
				</Grid>
			</div>
		</Container>
	);
}
{
	/* <Container maxWidth="lg" className={classes.container}>
	<Grid container spacing={3}>
		<Grid item xs={12}>
			<Paper className={classes.paper}>
				<Table />
			</Paper>
		</Grid>
	</Grid>
	<Box pt={4}>
		<Copyright />
	</Box>
</Container>; */
}
