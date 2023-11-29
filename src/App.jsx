import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import Login from "./pages/Login";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { TailSpin } from "react-loader-spinner";

function App() {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const unsubscibe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);
		});

		return unsubscibe;
	}, []);

	console.log(user);

	if (loading) {
		return (
			<TailSpin
				height="50"
				width="50"
				color="#000"
				ariaLabel="tail-spin-loading"
				radius="1"
				wrapperClass="loader-initial"
				visible={true}
			/>
		);
	}

	return <>{user ? <Main user={user} /> : <Login />}</>;
}

export default App;
