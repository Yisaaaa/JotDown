import "../css/Editor.css";
import VisibilityIcon from "@mui/icons-material/Visibility";

export default function Editor({
	tempNoteText,
	setTempNoteText,
	setIsPreviewShown,
}) {
	function togglePreview() {
		setIsPreviewShown(
			(isPreviewShownPrevState) => !isPreviewShownPrevState
		);
	}

	return (
		<div className="editor">
			<header className="editor-header">
				<label htmlFor="text-editor" className="editor-title">
					MARKDOWN
				</label>
				<div className="editor-header-icons">
					<div onClick={togglePreview} className="editor-header-icon">
						<VisibilityIcon style={{ fontSize: "22px" }} />
					</div>
				</div>
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
