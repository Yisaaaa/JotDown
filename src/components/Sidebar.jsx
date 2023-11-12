import React from "react";
import "../css/Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Note from "./Note";

export default function Sidebar({
	notes,
	sidebarActive,
	toggleSidebar,
	selected,
	setCurrentId,
}) {
	const noteComponents = notes.map((note) => {
		return (
			<li
				key={note.id}
				className={selected === note ? "selected" : ""}
				onClick={() => setCurrentId(note.id)}
			>
				<Note note={note}></Note>
			</li>
		);
	});

	return (
		<div className={`sidebar ${sidebarActive ? "" : "hidden"}`}>
			<div className="hamburger-container">
				<span className="logo">MARKDOWN</span>
				<button className="hamburger" onClick={() => toggleSidebar()}>
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
			</div>
			<ul className="notes">{noteComponents}</ul>
		</div>
	);
}
