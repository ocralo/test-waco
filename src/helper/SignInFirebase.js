//import firebase
import Firebase from "./Firebase";

export const LoginWithEmail = (email, password) => {
	if (!!email && password) {
		return Firebase.auth().signInWithEmailAndPassword(email, password);
	}
};

export const SesionFirebase = () => {
	return new Promise((resolve, reject) => {
		Firebase.auth().onAuthStateChanged((user) => {
			if (user) {
				// User is signed in, see docs for a list of available properties
				// https://firebase.google.com/docs/reference/js/firebase.User
				const uid = { uid: user.uid, email: user.email };
				console.log(user);
				resolve(uid);
				// ...
			} else {
				resolve(null);
			}
		});
	});
};

export const LogoutFirebase = () => Firebase.auth().signOut();

export const CreateUserWithEmail = (email, password) =>
	Firebase.auth().createUserWithEmailAndPassword(email, password);
