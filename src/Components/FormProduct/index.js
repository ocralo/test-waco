import React, { useState, useEffect } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import PropTypes from "prop-types";

const useStyles = makeStyles((theme) => ({
	paper: {
		marginTop: theme.spacing(2),
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
}));

function FormProduct({
	handleSubmitForm,
	setOpen,
	title,
	textButton,
	productData,
}) {
	const [product, setProduct] = useState({});
	const classes = useStyles();

	useEffect(() => {
		setProduct(productData);
	}, [productData]);

	const handleInputChange = (event) => {
		const target = event.target;
		const value =
			target.type === "checkbox" ? target.checked : target.value;
		const name = target.name;

		setProduct({ ...product, [name]: value });
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (
			!!product.name &&
			!!product.description &&
			!!product.price &&
			!!product.stock
		) {
			console.log({ productos: product });
			handleSubmitForm(product);
			setOpen(false);
			setProduct({});
		}
	};

	return (
		<div className={classes.paper}>
			<Typography component="h1" variant="h5">
				{title}
			</Typography>
			<form className={classes.form} onSubmit={handleSubmit}>
				<Grid container spacing={1}>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="name"
							label="Product Name"
							name="name"
							autoComplete="name"
							autoFocus
							value={product?.name || ""}
							onChange={handleInputChange}
						/>
					</Grid>
					<Grid item xs={12}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="description"
							label="Product Description"
							name="description"
							autoComplete="description"
							value={product?.description || ""}
							onChange={handleInputChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="price"
							label="Product Price"
							name="price"
							type="number"
							autoComplete="price"
							value={product?.price || 0}
							onChange={handleInputChange}
						/>
					</Grid>
					<Grid item xs={12} sm={6}>
						<TextField
							variant="outlined"
							required
							fullWidth
							id="stock"
							label="Product Stock"
							name="stock"
							type="number"
							autoComplete="stock"
							value={product?.stock || 0}
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
					<b>{textButton}</b>
				</Button>
			</form>
		</div>
	);
}

FormProduct.propTypes = {
	title: PropTypes.string,
	textButton: PropTypes.string,
};

FormProduct.defaultProps = {
	title: "Create Product",
	textButton: "Create Product",
};

export default FormProduct;
