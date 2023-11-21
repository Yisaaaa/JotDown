import React from "react";
import "../css/Note.css";

export default function Note({ note }) {
	let name;
	const content = note.content;

	if (content == false) {
		name = "Empty note";
	} else {
		name = JSON.parse(JSON.stringify(content).split("\n")[0]);
	}

	console.log(note);

	return (
		<div className="note">
			<p className="note-name">{name}</p>
		</div>
	);
}
