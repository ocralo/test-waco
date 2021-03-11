//import firebase
import Firebase from "./Firebase";

export const LoginWithEmail = (email, password) => {
	if (!!email && password) {
		return Firebase.auth().signInWithEmailAndPassword(email, password);
	}
};

export const SesionFirebase = () => {
	return new Promise((resolve) => {
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

export const LogoutFirebase = () => {
	return new Promise((resolve) => {
		Firebase.auth()
			.signOut()
			.then(() => {
				// Sign-out successful.
				resolve(true);
			})
			.catch((error) => {
				resolve(false);
				// An error happened.
			});
	});
};

export const CreateUserWithEmail = (email, password) =>
	Firebase.auth().createUserWithEmailAndPassword(email, password);
