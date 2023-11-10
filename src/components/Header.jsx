import React from "react";
import "../css/Header.css";

export default function Header() {
	return (
		<header className="header">
			<div className="left">
				<button className="hamburger">X</button>
				<span className="logo">MARKDOWN</span>
				<div className="divider"></div>
			</div>
			<div className="right">
				<button className="delete-note">Delete</button>
				<button className="save-note">Save changes</button>
			</div>
		</header>
	);
}
