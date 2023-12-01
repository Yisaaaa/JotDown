import React, { useState } from "react";
import LoginImg from "../assets/img/hero.png";
import "../css/Login.css";
import { auth } from "../firebase";
import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import GoogleIcon from "@mui/icons-material/Google";

function Login() {
	const [loader, setLoader] = useState(false);
	const [a, setA] = useState(0);

	async function handleSubmit(e) {
		e.preventDefault();
		setLoader(true);
		const email = e.target[0].value;
		const pass = e.target[1].value;
		const res = await signInWithEmailAndPassword(auth, email, pass);
	}

	return (
		<main className="login-page">
			<header className="logo-login">JotDown</header>
			<div className="login-container">
				<div className="login-left">
					<form onSubmit={handleSubmit} className="login-form">
						<p className="welcome-text">
							Welcome back to JotDown 👋
						</p>
						<div className="inputs">
							<div className="input-container">
								<label htmlFor="email">Email address</label>
								<input
									className="email"
									name="email"
									type="email"
									id="email"
								/>
							</div>
							<div className="input-container">
								<label htmlFor="passwd">Password</label>
								<input
									className="passwd"
									name="passwd"
									type="password"
									id="passwd"
								/>
							</div>
						</div>
						<button
							type="submit"
							className="login-btn login-submit"
						>
							{loader ? (
								<ThreeDots
									height="20"
									width="40"
									radius="9"
									color="#fff"
									ariaLabel="three-dots-loading"
									wrapperClass="loader-login-btn"
									visible={true}
								/>
							) : (
								"Log in"
							)}
						</button>
						<p className="or">or</p>
						<button
							type="submit"
							className="login-btn google-login"
						>
							<svg
								className="google-logo"
								viewBox="0 0 533.5 544.3"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
									fill="#4285f4"
								/>
								<path
									d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
									fill="#34a853"
								/>
								<path
									d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
									fill="#fbbc04"
								/>
								<path
									d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
									fill="#ea4335"
								/>
							</svg>
							Continue with Google
						</button>
					</form>
				</div>
				<div className="login-right">
					<img className="login-img" src={LoginImg} />
				</div>
				<div className="signup-container">
					<p className="signup-text">
						New to JotDown? Start jotting down now
					</p>
					<button className="signup-btn login-btn">Sign up</button>
				</div>
			</div>
		</main>
	);
}

export default Login;
