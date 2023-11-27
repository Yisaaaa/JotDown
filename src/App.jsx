import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db, usersCollection } from "./firebase";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

function App() {
	const [user, setUser] = useState("");

	useEffect(() => {
		const unsubscibe = onAuthStateChanged(auth, (user) => {
			console.log("logged in ", user);
			setUser(user);
		});

		return unsubscibe;
	}, []);

	return <>{user ? <Main user={user} /> : <Login />}</>;
}

export default App;
