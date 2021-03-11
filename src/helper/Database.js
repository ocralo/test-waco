import Firebase from "./Firebase";

export const FDB = Firebase.firestore();

export const dbRef = FDB.collection("productos");

/**
 *
 * @param {*} component
 * @returns
 */
export const DeleteProduct = (component) =>
	dbRef
		.doc(component)
		.delete()
		.then(() => {
			console.log("Document successfully deleted!");
			alert("Se elimino el producto.");
		})
		.catch((error) => {
			console.error("Error removing document: ", error);
			alert("No se elimino el producto.");
		});

/**
 *
 * @param {*} data
 * @returns
 */
export const CreateProduct = (data) =>
	dbRef
		.doc()
		.set(data)
		.then(() => {
			alert("Creación completa.");
		})
		.catch((error) => {
			alert("Error.");
		});

/**
 *
 * @param {*} data
 * @returns
 */
export const UpdateProduct = (data) => {
	console.log(data);
	dbRef
		.doc(data.id)
		.update(data)
		.then(() => {
			alert("Actualización completada.");
		})
		.catch((error) => {
			alert("Error.");
		});
};
