import React from "react";
import LoginImg from "../../public/img/hero.png";
import "../css/Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";

function Login() {
	async function handleSubmit(e) {
		e.preventDefault();
		const email = e.target[0].value;
		const pass = e.target[1].value;
		const res = await signInWithEmailAndPassword(auth, email, pass);
	}

	return (
		<main className="login-page">
			<header className="logo-login">Markdown</header>
			<div className="login-container">
				<div className="login-left">
					<form onSubmit={handleSubmit} className="login-form">
						<div className="inputs">
							<label htmlFor="email">Email</label>
							<input
								className="email"
								name="email"
								type="email"
								id="email"
							/>
							<label htmlFor="passwd">Password</label>
							<input
								className="passwd"
								name="passwd"
								type="password"
								id="passwd"
							/>
						</div>
						<button type="submit" className="login-submit">
							Login
						</button>
					</form>
				</div>
				<div className="login-right">
					<img className="login-img" src={LoginImg} />
				</div>
			</div>
		</main>
	);
}

export default Login;
