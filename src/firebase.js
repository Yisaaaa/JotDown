import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Replace the following with your app's Firebase project configuration
// See: https://support.google.com/firebase/answer/7015592
const firebaseConfig = {
	apiKey: "AIzaSyAk8clReu3v1Iyav1F3gqVK_HmbTHpgXkM",
	authDomain: "notes-44fae.firebaseapp.com",
	projectId: "notes-44fae",
	storageBucket: "notes-44fae.appspot.com",
	messagingSenderId: "74684363822",
	appId: "1:74684363822:web:3fb7e7dce293716a671bbf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);
export const notesCollection = collection(db, "notes");
