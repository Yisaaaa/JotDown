import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import Sidebar from "../components/Sidebar";
import data from "../data";
import { notesCollection } from "../firebase";
import {
	addDoc,
	deleteDoc,
	updateDoc,
	onSnapshot,
	doc,
} from "firebase/firestore";

export default function Main() {
	const [notes, setNotes] = useState([]);
	const [currentNoteID, setCurrentId] = useState("");
	const [sidebarActive, setSidebarActive] = useState(false);
	const [tempNoteText, setTempNoteText] = useState("");

	const currentNote = notes.find((note) => note.id === currentNoteID);
	const sidebarEl = document.querySelector(".sidebar");
	const sortedNotes = notes.sort((a, b) => {
		return b.updatedAt - a.updatedAt;
	});

	useEffect(() => {
		const unsubscribe = onSnapshot(notesCollection, (snapshot) => {
			const notesArray = snapshot.docs.map((doc) => {
				return { ...doc.data(), id: doc.id };
			});
			setNotes(notesArray);
		});

		return unsubscribe;
	}, []);

	useEffect(() => {
		const timeoutID = setTimeout(() => {
			if (tempNoteText !== currentNote.content) {
				updateNote(tempNoteText);
			}
		}, 1000);

		return () => {
			clearTimeout(timeoutID);
		};
	}, [tempNoteText]);

	useEffect(() => {
		if (currentNote) {
			setTempNoteText(currentNote.content);
		}
	}, [currentNote]);

	// useEffect(() => {
	// 	if (!notes.length) {
	// 		addNoteIntroduction();
	// 	}
	// }, []); BUG: Creates introduction note when page is

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

	async function updateNote(text) {
		if (currentNoteID) {
			const docRef = doc(notesCollection, currentNoteID);
			await updateDoc(docRef, {
				content: text,
				updatedAt: `${Date.now()}`,
			});
		}
	}

	async function deleteNote(id) {
		if (notes.length !== 0) {
			await deleteDoc(doc(notesCollection, id));
		}
	}

	async function addNote(text) {
		const dateNow = Date.now();

		const note = {
			title: "untitled",
			content: text,
			createdAt: dateNow,
			updatedAt: dateNow,
		};
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
					// notes={notes}
					notes={sortedNotes}
					selected={currentNote}
					sidebarActive={sidebarActive}
					toggleSidebar={toggleSidebar}
					setCurrentId={setCurrentId}
				></Sidebar>
				{/* {currentNote && (
					<Editor
						note={tempNoteText}
						setTempNoteText={setTempNoteText}
					/>
				)}
				{currentNote && <Preview note={currentNote} />} */}
				{currentNote && [
					<Editor
						key="editor"
						tempNoteText={tempNoteText}
						setTempNoteText={setTempNoteText}
					/>,
					<Preview key="preview" tempNoteText={tempNoteText} />,
				]}
			</main>
		</div>
	);
}
