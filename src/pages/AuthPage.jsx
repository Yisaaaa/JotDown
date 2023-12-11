import React, { useState } from "react";
import LoginImg from "../assets/img/hero.png";
import "../css/AuthPage.css";
import { auth } from "../firebase";
import {
	signInWithEmailAndPassword,
	createUserWithEmailAndPassword,
	signInWithPopup,
	GoogleAuthProvider,
} from "firebase/auth";
import { ThreeDots } from "react-loader-spinner";
import WarningIcon from "@mui/icons-material/Warning";
import { red } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

function Login({ isLogin }) {
	const ERRORS = {
		"auth/invalid-email": "Please enter your email",
		"auth/missing-password": "Please enter your password",
		"auth/invalid-login-credentials": "Email or password is incorrect",
		"auth/email-already-in-use": "Email is already in use.",
	};
	const [loader, setLoader] = useState(false);
	const [error, setError] = useState("");

	const navigate = useNavigate();
	const googleProvider = new GoogleAuthProvider();

	async function handleSubmit(e) {
		e.preventDefault();
		setLoader(true);
		const email = e.target[0].value;
		const pass = e.target[1].value;
		try {
			if (isLogin) {
				await signInWithEmailAndPassword(auth, email, pass);
			} else {
				await createUserWithEmailAndPassword(auth, email, pass);
			}
			setError("");
			navigate("/");
		} catch (error) {
			setError(ERRORS[error.code]);
		} finally {
			setLoader(false);
		}
	}

	async function googleSignIn(e) {
		e.preventDefault();
		await signInWithPopup(auth, googleProvider);
		navigate("/");
	}

	function handleAuthAltBtn() {
		setError("");
		if (isLogin) {
			navigate("/create-account");
		} else {
			navigate("/login");
		}
	}

	return (
		<main className="login-page">
			<header className="logo-login">JotDown</header>
			<div className="login-container">
				<div className="login-left">
					<form onSubmit={handleSubmit} className="login-form">
						<p className=" welcome-text">
							{isLogin
								? "Welcome back to JotDown 👋"
								: "Create account"}
						</p>
						{error && (
							<div className="error-container">
								<WarningIcon
									sx={{ fontSize: 24, color: red[600] }}
								/>
								<p className="error-msg">{error}</p>
							</div>
						)}
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
							) : isLogin ? (
								"Log in"
							) : (
								"Sign up"
							)}
						</button>
						<p className="or">or</p>
						<button
							className="login-btn google-login"
							onClick={googleSignIn}
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
				<div className="auth-alt-container">
					<p className="auth-alt-text">
						{isLogin
							? "New to JotDown? Start jotting down now"
							: "Already have an account?"}
					</p>
					<button
						// TODO: this wont change the state isLogin--there is no such
						// state anymore. Instead, it will be a Link to "/login"
						// or "/create-account" depending on the value of isLogin prop.
						onClick={handleAuthAltBtn}
						className="auth-alt-btn login-btn"
					>
						{isLogin ? "Sign up" : "Log in"}
					</button>
				</div>
			</div>
		</main>
	);
}

export default Login;
