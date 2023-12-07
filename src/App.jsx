import React, { useEffect, useState } from "react";
import Main from "./pages/Main";
import AuthPage from "./pages/AuthPage";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./firebase";
import { TailSpin } from "react-loader-spinner";

import ReactDOM from "react-dom/client";

import {
	createBrowserRouter,
	Navigate,
	redirect,
	RouterProvider,
	useNavigate,
} from "react-router-dom";

function App() {
	const [user, setUser] = useState("");
	const [loading, setLoading] = useState(true);
	const navigate = useNavigate();

	useEffect(() => {
		const unsubscibe = onAuthStateChanged(auth, (user) => {
			setUser(user);
			setLoading(false);

			if (user) {
				navigate("/");
			}
		});

		return unsubscibe;
	}, []);

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

	console.log(user);
	return <>{user ? <Main user={user} /> : <Navigate to={"/login"} />}</>;
}

export default App;
