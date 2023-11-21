import React from "react";
import "../css/Header.css";
import MenuIcon from "@mui/icons-material/Menu";

export default function Header({ toggleSidebar, addNote }) {
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
				<button
					onClick={(e) => {
						e.stopPropagation();
						addNote();
					}}
					className="create-note btn-header"
				>
					<span>+</span> Create Note
				</button>
				<button className="delete-note btn-header">Delete</button>
				{/* <button className="save-note btn-header">Save changes</button> */}
			</div>
		</header>
	);
}
