import React from "react";
import "../css/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header({ toggleSidebar, createNote, deleteNote }) {
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
						createNote();
					}}
					className="create-note btn-header"
				>
					<span>+</span> Create Note
				</button>
				<button
					onClick={(e) => {
						e.stopPropagation();
						deleteNote();
					}}
					className="delete-note btn-header"
				>
					Delete
				</button>
				<button onClick={() => signOut(auth)}>signOUt</button>
			</div>
		</header>
	);
}
