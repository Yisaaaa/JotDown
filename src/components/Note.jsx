import React, { useState } from "react";
import "../css/Note.css";
import Rename from "@mui/icons-material/DriveFileRenameOutline";
import { setDoc, doc } from "firebase/firestore";
import { db } from "../firebase";

export default function Note({ note, notesCollectionPath }) {
	const [inInputState, setInInputState] = useState(false);
	const [title, setTitle] = useState(note.title);
	// let name;
	// const content = note.content;

	// if (content == false) {
	// 	name = "Empty note";
	// } else {
	// 	name = JSON.parse(JSON.stringify(content).split("\n")[0]);
	// }

	function showNoteMenu(e) {
		e.stopPropagation();
		setInInputState((prevState) => !prevState);
	}

	async function updateTitle(title) {
		const docRef = doc(db, notesCollectionPath, note.id);
		title = title ? title : "untitled";

		await setDoc(
			docRef,
			{
				title: title,
				updatedAt: Date.now(),
			},
			{ merge: true }
		);

		setInInputState(false);
		setTitle(title);
	}

	function handleRenameSubmit(e) {
		e.preventDefault();
		const newTitle = e.target[0].value;
		updateTitle(newTitle);
	}

	function handleCancel(e) {
		e.stopPropagation();
		e.preventDefault();
		setInInputState(false);
	}

	function handleKeyDown(e) {
		if (e.key === "Enter") {
			updateTitle(e.target.value);
		}
	}

	return (
		<div className="note">
			{inInputState ? (
				<form onSubmit={handleRenameSubmit} className="rename-form">
					<label htmlFor="rename-input" className="rename-label">
						Rename to
					</label>
					<input
						id="rename-input"
						className="rename-input"
						type="text"
						defaultValue={title}
						onKeyDown={handleKeyDown}
					/>
					<div className="form-btn-container">
						<button
							onClick={handleCancel}
							className="note-menu-btn cancel-btn"
						>
							Cancel
						</button>
						<button
							type="submit"
							className="note-menu-btn rename-btn"
						>
							Rename
						</button>
					</div>
				</form>
			) : (
				<>
					<p className="note-name">{title}</p>
					<span className="note-menu-wrapper" onClick={showNoteMenu}>
						<Rename sx={{ fontSize: 16 }} />
					</span>
				</>
			)}
		</div>
	);
}
