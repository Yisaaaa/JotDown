import React from "react";
import "../css/Header.css";
import MenuIcon from "@mui/icons-material/Menu";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export default function Header({
	selectedNote,
	toggleSidebar,
	createNote,
	deleteNote,
}) {
	return (
		<header className="header">
			<div className="left">
				<button onClick={toggleSidebar} className="hamburger">
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
				<span className="logo">JotDown</span>
				<div className="divider"></div>
				<span className="note-title">{selectedNote.title}</span>
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
				<button
					className="sign-out-btn btn-header"
					onClick={() => signOut(auth)}
				>
					Sign out
				</button>
			</div>
		</header>
	);
}
