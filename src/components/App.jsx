import React, { useEffect, useState } from "react";
import Header from "./Header";
import Editor from "./Editor";
import Preview from "./Preview";
import Sidebar from "./Sidebar";
import data from "../data";
import { notesCollection } from "../firebase";
import { addDoc, deleteDoc, onSnapshot, doc } from "firebase/firestore";

export default function App() {
	const [notes, setNotes] = useState([]);
	const [currentNoteID, setCurrentId] = useState("");
	const currentNote = notes.find((note) => note.id === currentNoteID);
	const [sidebarActive, setSidebarActive] = useState(false);
	const sidebarEl = document.querySelector(".sidebar");

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
			const notesArray = snapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setNotes(notesArray);
		});

		return unsubscribe;
	}, []);

	// useEffect(() => {
	// 	if (!notes.length) {
	// 		addNoteIntroduction();
	// 	}
	// }, []); BUG: Creates introduction note when page is refreshed.

	useEffect(() => {
		if (!currentNoteID) {
			setCurrentId(notes[0]?.id);
		} else {
			if (!checkNoteExists(currentNoteID)) {
				setCurrentId(notes[0]?.id);
			}
		}
	}, [notes]);

	function checkNoteExists(id) {
		for (let note of notes) {
			if (note.id === id) {
				return true;
			}
			return false;
		}
	}

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

	async function deleteNote(id) {
		await deleteDoc(doc(notesCollection, id));
	}

	async function addNote(text) {
		const note = { title: "untitled", content: `${text}` };
		const docRef = await addDoc(notesCollection, note);
		setCurrentId(docRef.id);
	}

	function addNewNote() {
		const text = "Start typing here...";
		addNote(text);
	}

	function addNoteIntroduction() {
		const text = data[0].content;
		addNote(text);
	}

	function toggleSidebar() {
		setSidebarActive((prev) => !prev);
	}

	function closeSideBarIfOpen(e) {
		if (sidebarEl && !sidebarEl.contains(e.target) && sidebarActive) {
			toggleSidebar();
		}
	}

	return (
		<div className="wrapper" onClick={closeSideBarIfOpen}>
			<Header
				toggleSidebar={toggleSidebar}
				currentNote={currentNote}
				addNote={addNewNote}
				deleteNote={() => deleteNote(currentNoteID)}
			/>
			<main className="main">
				<Sidebar
					notes={notes}
					selected={currentNote}
					sidebarActive={sidebarActive}
					toggleSidebar={toggleSidebar}
					setCurrentId={setCurrentId}
				></Sidebar>
				{currentNote && (
					<Editor note={currentNote} handleChange={updateNote} />
				)}
				{currentNote && <Preview note={currentNote} />}
			</main>
		</div>
	);
}
