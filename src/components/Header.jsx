import React from "react";
import "../css/Header.css";
import MenuIcon from "@mui/icons-material/Menu";

import HeaderNav from "./HeaderNav";

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
				<HeaderNav
					iconsOnly={false}
					createNote={createNote}
					deleteNote={deleteNote}
				/>
			</div>
		</header>
	);
}
