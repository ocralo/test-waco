import React, { useState, useEffect } from "react";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

//import Components
import ModalProduct from "./../ModalProduct";

//import firebase
import {
	CreateProduct,
	dbRef,
	DeleteProduct,
	UpdateProduct,
} from "./../../helper/Database";

const StyledTableCell = withStyles((theme) => ({
	head: {
		backgroundColor: theme.palette.common.black,
		color: theme.palette.common.white,
	},
	body: {
		fontSize: 14,
	},
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
	root: {
		"&:nth-of-type(odd)": {
			backgroundColor: theme.palette.action.hover,
		},
	},
}))(TableRow);

function createData(name, calories, fat, carbs, protein) {
	return { name, calories, fat, carbs, protein };
}

const rows = [
	createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
	createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
	createData("Eclair", 262, 16.0, 24, 6.0),
	createData("Cupcake", 305, 3.7, 67, 4.3),
	createData("Gingerbread", 356, 16.0, 49, 3.9),
];

const useStyles = makeStyles({
	table: {
		minWidth: 700,
	},
});

export default function CustomizedTables() {
	const classes = useStyles();
	const [products, setproducts] = useState([]);

	useEffect(() => {
		dbRef.onSnapshot(
			(querySnapshot) => {
				const docs = [];
				querySnapshot.forEach((doc) => {
					doc.data().id = doc.id;
					docs.push({ ...doc.data(), id: doc.id });
				});
				console.log({ docs });
				setproducts(docs);
			},
			(error) => {
				// ...
			}
		);
	}, []);

	const handleSubmitFormCreate = (data) => {
		CreateProduct(data);
	};
	const handleSubmitFormDelete = (id) => {
		DeleteProduct(id);
	};
	const handleSubmitFormEdit = (data) => {
		UpdateProduct(data);
	};

	return (
		<>
			<ModalProduct
				handleSubmitForm={handleSubmitFormCreate}
				ButtonText={"Create Product"}
			/>

			<TableContainer component={Paper}>
				<Table className={classes.table} aria-label="customized table">
					<TableHead>
						<TableRow>
							<StyledTableCell>Name</StyledTableCell>
							<StyledTableCell align="center">Description</StyledTableCell>
							<StyledTableCell align="center">Stock</StyledTableCell>
							<StyledTableCell align="center">Price</StyledTableCell>
							<StyledTableCell align="center">Option</StyledTableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{products.map((row, i) => (
							<StyledTableRow key={row.id}>
								<StyledTableCell component="th" scope="row">
									{row.name}
								</StyledTableCell>
								<StyledTableCell align="center">
									{row.description}
								</StyledTableCell>
								<StyledTableCell align="center">
									{row.stock}
								</StyledTableCell>
								<StyledTableCell align="center">
									{row.price}
								</StyledTableCell>
								<StyledTableCell align="center">
									<ModalProduct
										product={row}
										deleteButton
										ButtonText={"Update Product"}
										titleFormModal={"Update Product"}
										textButtonForm={"Update Product"}
										handleSubmitFormDelete={handleSubmitFormDelete}
										handleSubmitForm={handleSubmitFormEdit}
									/>
								</StyledTableCell>
							</StyledTableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</>
	);
}
