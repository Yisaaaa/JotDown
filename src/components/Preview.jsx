import React from "react";
import "../css/Preview.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function Preview({ tempNoteText }) {
	return (
		<div className="preview">
			<header className="preview-header">
				<label htmlFor="" className="preview-title">
					PREVIEW
				</label>
			</header>
			<div className="preview-pane">
				<Markdown remarkPlugins={[remarkGfm]}>{tempNoteText}</Markdown>
			</div>
		</div>
	);
}
