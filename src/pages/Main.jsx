import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import Editor from "../components/Editor";
import Preview from "../components/Preview";
import Sidebar from "../components/Sidebar";
import data from "../data";
import { db } from "../firebase";
import {
	doc,
	addDoc,
	deleteDoc,
	collection,
	onSnapshot,
	setDoc,
	getDoc,
} from "firebase/firestore";

export default function Main({ user }) {
	const notesCollectionPath = `usersCollection/${user.uid}/notesCollection`;

	const [notes, setNotes] = useState([]);
	useEffect(() => {
		const unsubscribe = onSnapshot(
			collection(db, notesCollectionPath),
			(snapshot) => {
				console.log("notes has changed");
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

	const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt);

	const [sidebarActive, setSidebarActive] = useState(false);
	const sidebarEl = document.querySelector(".sidebar");

	const [selectedNote, setSelectedNote] = useState("");
	useEffect(() => {
		if (sortedNotes.length !== 0) {
			setSelectedNote(sortedNotes[0]);
		}
	}, [notes]);

	const [tempNoteText, setTempNoteText] = useState("");
	useEffect(() => {
		if (selectedNote) {
			setTempNoteText(selectedNote.content);
		} else {
			setTempNoteText("");
		}
	}, [selectedNote]);

	useEffect(() => {
		const timeoutId = setTimeout(() => {
			if (selectedNote.content !== tempNoteText) {
				updateNote(tempNoteText);
			}
		}, 1000);

		return () => {
			clearTimeout(timeoutId);
		};
	}, [tempNoteText]);

	function toggleSidebar() {
		setSidebarActive((prev) => !prev);
	}

	function closeSideBarIfOpen(e) {
		if (sidebarEl && !sidebarEl.contains(e.target) && sidebarActive) {
			toggleSidebar();
		}
	}

	async function createNote() {
		const dateNow = Date.now();
		setSelectedNote("");

		await addDoc(collection(db, notesCollectionPath), {
			title: "untitled",
			// 			content: `# Welcome to JotDown!
			// ## Start jotting here...`,
			content: data[0].content,
			createdAt: dateNow,
			updatedAt: dateNow,
		});
	}

	async function deleteNote() {
		if (selectedNote) {
			setSelectedNote("");
			await deleteDoc(doc(db, notesCollectionPath, selectedNote.id));
		}
	}

	async function updateNote(text) {
		if (selectedNote) {
			await setDoc(
				doc(db, notesCollectionPath, selectedNote.id),
				{
					content: text,
					updatedAt: Date.now(),
				},
				{ merge: true }
			);
		}
	}

	return (
		<div className="wrapper" onClick={closeSideBarIfOpen}>
			<Header
				selectedNote={selectedNote}
				toggleSidebar={toggleSidebar}
				createNote={createNote}
				deleteNote={deleteNote}
			/>
			<main className="main">
				<Sidebar
					notes={notes}
					selectedNote={selectedNote}
					setSelectedNote={setSelectedNote}
					sidebarActive={sidebarActive}
					toggleSidebar={toggleSidebar}
					notesCollectionPath={notesCollectionPath}
				></Sidebar>

				<Editor
					key="editor"
					tempNoteText={tempNoteText}
					setTempNoteText={setTempNoteText}
				/>
				<Preview key="preview" tempNoteText={tempNoteText} />
			</main>
		</div>
	);
}
