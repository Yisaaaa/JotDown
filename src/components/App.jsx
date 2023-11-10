import React, { useState } from "react";
import Header from "./Header";
import Editor from "./Editor";
import Preview from "./Preview";
import data from "../data";

export default function App() {
	const [notes, setNotes] = useState(data);

	const [currentNoteID, setCurrentNote] = useState(notes[0].id);

	const currentNote = notes.find((note) => note.id === currentNoteID);

	function updateNote(text) {
		setNotes((oldNotes) => {
			const newArray = [];

			oldNotes.forEach((note) => {
				if (note.id === currentNoteID) {
					newArray.unshift({ ...note, content: text });
				} else {
					newArray.push(note);
				}
			});

			return newArray;
		});
	}

	return (
		<>
			<Header />
			<main className="main">
				<Editor note={currentNote} handleChange={updateNote} />
				<Preview note={currentNote} />
			</main>
		</>
	);
}
