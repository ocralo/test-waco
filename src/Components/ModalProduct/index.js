import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import FormProduct from "./../FormProduct";

function getModalStyle() {
	const top = 50;
	const left = 50;

	return {
		top: `${top}%`,
		left: `${left}%`,
		transform: `translate(-${top}%, -${left}%)`,
	};
}

const useStyles = makeStyles((theme) => ({
	paper: {
		position: "absolute",
		width: 400,
		backgroundColor: theme.palette.background.paper,
		border: "2px solid #000",
		boxShadow: theme.shadows[5],
		padding: theme.spacing(2, 4, 3),
	},
	button: { alignSelf: "flex-start", margin: 10 },
}));

export default function SimpleModal({
	product,
	handleSubmitForm,
	handleSubmitFormDelete,
	ButtonText,
	deleteButton,
	titleFormModal,
	textButtonForm,
}) {
	const classes = useStyles();
	// getModalStyle is not a pure function, we roll the style only on the first render
	const [modalStyle] = useState(getModalStyle);
	const [open, setOpen] = useState(false);

	const handleOpen = () => {
		setOpen(true);
	};

	const handleClose = () => {
		setOpen(false);
	};

	return (
		<>
			<Button
				variant="contained"
				onClick={handleOpen}
				className={classes.button}
				color="primary"
				disableElevation>
				{ButtonText}
			</Button>
			{!!deleteButton ? (
				<Button
					variant="contained"
					onClick={() => {
						handleSubmitFormDelete(product.id);
					}}
					className={classes.button}
					color="primary"
					disableElevation>
					Delete Product
				</Button>
			) : null}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="simple-modal-title"
				aria-describedby="simple-modal-description">
				<div style={modalStyle} className={classes.paper}>
					<FormProduct
						productData={product}
						handleSubmitForm={handleSubmitForm}
						setOpen={setOpen}
						title={titleFormModal}
						textButton={textButtonForm}
					/>
				</div>
			</Modal>
		</>
	);
}
