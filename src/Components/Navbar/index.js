import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import List from "@material-ui/core/List";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import Drawer from "@material-ui/core/Drawer";
import Divider from "@material-ui/core/Divider";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";

import UserContext from "./../../Context/Users/UserContext";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
	root: {
		display: "flex",
	},
	menuButton: {
		marginRight: theme.spacing(2),
	},
	title: {
		flexGrow: 1,
	},
	drawerHeader: {
		display: "flex",
		alignItems: "center",
		justifyContent: "flex-end",
		padding: "0 8px",
		...theme.mixins.toolbar,
	},
	drawerPaper: {
		position: "fixed",
		width: drawerWidth,
	},
}));

export default function MenuAppBar({}) {
	const classes = useStyles();
	const [anchorEl, setAnchorEl] = useState(null);
	const [menuOpen, setMenuOpen] = useState(null);
	const open = Boolean(anchorEl);
	const openMenu = Boolean(menuOpen);

	let history = useHistory();
	const { getUser, user: auth, logoutUser } = useContext(UserContext);

	useEffect(() => {
		getUser();
	}, []);

	const handleDrawerOpen = () => {
		setMenuOpen(true);
	};

	const handleDrawerClose = () => {
		setMenuOpen(false);
	};

	const handleMenu = (event) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};
	const handleCloseLogout = () => {
		/* LogoutFirebase()
			.then((result) => {
				setAnchorEl(null);
				history("/");
			})
			.catch((err) => {}); */
		logoutUser();
		history.push("/");
	};

	return (
		<div className={classes.root}>
			<AppBar>
				<Toolbar>
					{/* {!!auth && (
						<IconButton
							edge="start"
							className={classes.menuButton}
							onClick={handleDrawerOpen}
							color="inherit"
							aria-label="menu">
							<MenuIcon />
						</IconButton>
					)} */}
					<Typography variant="h6" className={classes.title}>
						Waco test
					</Typography>
					{!!auth && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								onClick={handleMenu}
								color="inherit">
								<AccountCircle />
							</IconButton>
							<Menu
								id="menu-appbar"
								anchorEl={anchorEl}
								anchorOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								keepMounted
								transformOrigin={{
									vertical: "top",
									horizontal: "right",
								}}
								open={open}
								onClose={handleClose}>
								<MenuItem onClick={handleCloseLogout}>Logout</MenuItem>
							</Menu>
						</div>
					)}
				</Toolbar>
			</AppBar>
			<Drawer
				variant="persistent"
				open={openMenu}
				classes={{
					paper: classes.drawerPaper,
				}}>
				<div className={classes.drawerHeader}>
					<IconButton onClick={handleDrawerClose}>
						{!!!openMenu ? <ChevronRightIcon /> : <ChevronLeftIcon />}
					</IconButton>
				</div>
				<Divider />
				<List>hola</List>
				<Divider />
				<List>hola 2</List>
				<Divider />
				<List>hola 2</List>
				{/* <List>{mailFolderListItems}</List>
				<Divider />
				<List>{otherMailFolderListItems}</List> */}
			</Drawer>
		</div>
	);
}
