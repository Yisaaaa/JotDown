import React, { useState } from "react";
import Header from "./Header";
import Editor from "./Editor";
import Preview from "./Preview";
import Sidebar from "./Sidebar";
import data from "../data";

export default function App() {
	const [notes, setNotes] = useState(data);

	const [currentNoteID, setCurrentId] = useState(notes[0].id);

	const currentNote = notes.find((note) => note.id === currentNoteID);

	const [sidebarActive, setSidebarActive] = useState(false);

	function updateNote(text) {
		setNotes((oldNotes) => {
			const newArray = [];

			oldNotes.forEach((note) => {
				if (note.id === currentNoteID) {
					newArray.unshift({ ...note, content: `${text}` });
				} else {
					newArray.push(note);
				}
			});

			return newArray;
		});
	}

	function toggleSidebar() {
		console.log(sidebarActive);
		setSidebarActive((prev) => !prev);
	}

	return (
		<>
			<Header toggleSidebar={toggleSidebar} currentNote={currentNote} />
			<main className="main">
				<Sidebar
					notes={notes}
					selected={currentNote}
					sidebarActive={sidebarActive}
					toggleSidebar={toggleSidebar}
					setCurrentId={setCurrentId}
				></Sidebar>
				<Editor note={currentNote} handleChange={updateNote} />
				<Preview note={currentNote} />
			</main>
		</>
	);
}
