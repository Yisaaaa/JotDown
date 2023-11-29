import React from "react";
import "../css/Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Note from "./Note";

export default function Sidebar({
	sidebarActive,
	toggleSidebar,
	notes,
	selectedNote,
	setSelectedNote,
}) {
	const noteComponents = notes.map((note) => {
		return (
			<li
				key={note.id}
				className={selectedNote.id === note.id ? "selected" : ""}
				onClick={() => setSelectedNote(note)}
			>
				<Note note={note}></Note>
			</li>
		);
	});

	return (
		<div className={`sidebar ${sidebarActive ? "" : "hidden"}`}>
			<div className="hamburger-container">
				<span className="logo">MARKDOWN</span>
				<button className="hamburger" onClick={(e) => toggleSidebar()}>
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
			</div>
			<ul className="notes">{noteComponents}</ul>
		</div>
	);
}
