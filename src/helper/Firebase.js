import firebase from "firebase";
import "firebase/auth";
import "firebase/firestore";

import FirebaseConfig from "./../config/FirebaseConfig";

firebase.initializeApp(FirebaseConfig);

export default firebase;
