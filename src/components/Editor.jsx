import "../css/Editor.css";

export default function Editor({ note, handleChange }) {
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
				value={note.content}
				onChange={(e) => handleChange(e.target.value)}
			></textarea>
		</div>
	);
}
