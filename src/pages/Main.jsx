import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import Sidebar from "../components/Sidebar";
import data from "../data";
import { db } from "../firebase";
import { collection, onSnapshot } from "firebase/firestore";

export default function Main({ user }) {
	const notesCollectionPath = `usersCollection/${user.uid}/notesCollection`;

	const [notes, setNotes] = useState([]);
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, notesCollectionPath),
			(snapshot) => {
				const notesArray = [];
				snapshot.docs.forEach((doc) => {
					const note = {
						id: doc.id,
						...doc.data(),
					};
					notesArray.push(note);
				});
				setNotes(notesArray);
			}
		);

		return unsubscribe;
	}, []);

	const [sidebarActive, setSidebarActive] = useState(false);
	const sidebarEl = document.querySelector(".sidebar");

	const [selectedNote, setSelectedNote] = useState("");
	useEffect(() => {
		if (notes.length !== 0) {
			setSelectedNote(notes[0].id);
		}
	}, [notes]);

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
			<Header toggleSidebar={toggleSidebar} />
			<main className="main">
				<Sidebar
					notes={notes}
					selectedNote={selectedNote}
					setSelectedNote={setSelectedNote}
					sidebarActive={sidebarActive}
					toggleSidebar={toggleSidebar}
				></Sidebar>
				{/* {currentNote && (
					<Editor
						note={tempNoteText}
						setTempNoteText={setTempNoteText}
					/>
				)}
				{currentNote && <Preview note={currentNote} />} */}
				<Editor key="editor" />
				<Preview key="preview" />
			</main>
		</div>
	);
}
