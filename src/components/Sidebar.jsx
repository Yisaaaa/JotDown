import React from "react";
import "../css/Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Note from "./Note";
import HeaderNav from "./HeaderNav";

export default function Sidebar({
	sidebarActive,
	toggleSidebar,
	notes,
	selectedNote,
	setSelectedNote,
	notesCollectionPath,
	createNote,
	deleteNote,
}) {
	const noteComponents = notes.map((note) => {
		return (
			<li
				key={note.id}
				className={selectedNote.id === note.id ? "selected" : ""}
				onClick={() => setSelectedNote(note)}
			>
				<Note
					notesCollectionPath={notesCollectionPath}
					note={note}
				></Note>
			</li>
		);
	});

	return (
		<div className={`sidebar ${sidebarActive ? "" : "hidden"}`}>
			<div className="hamburger-container">
				<span className="logo">JotDown</span>
				<button className="hamburger" onClick={(e) => toggleSidebar()}>
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
			</div>
			<HeaderNav
				iconsOnly={true}
				createNote={createNote}
				deleteNote={deleteNote}
			/>
			<ul className="notes">{noteComponents}</ul>
		</div>
	);
}
