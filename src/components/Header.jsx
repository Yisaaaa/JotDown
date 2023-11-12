import React from "react";
import "../css/Header.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ toggleSidebar }) {
	return (
		<header className="header">
			<div className="left">
				<button onClick={toggleSidebar} className="hamburger">
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
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
