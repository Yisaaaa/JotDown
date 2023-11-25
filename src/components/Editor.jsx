import "../css/Editor.css";

export default function Editor({ tempNoteText, setTempNoteText }) {
	return (
		<div className="editor">
			<header className="editor-header">
				<label htmlFor="" className="editor-title">
					MARKDOWN
				</label>
			</header>
			<textarea
				className="text-editor"
				name="text-editor"
				id="text-editor"
				value={tempNoteText}
				onChange={(e) => setTempNoteText(e.target.value)}
			></textarea>
		</div>
	);
}
