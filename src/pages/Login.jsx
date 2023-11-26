import React from "react";
import LoginImg from "../../public/img/hero.png";
import "../css/Login.css";

function Login() {
	return (
		<main className="login-page">
			<header className="logo">Markdown</header>
			<div className="login-container">
				<div className="login-left">
					<form className="login-form">
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
						<button className="login-submit">Login</button>
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
