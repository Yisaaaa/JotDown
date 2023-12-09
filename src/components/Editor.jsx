import "../css/Editor.css";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VerticalSplitIcon from "@mui/icons-material/VerticalSplit";

export default function Editor({
	tempNoteText,
	setTempNoteText,
	setIsPreviewShown,
	toggleIsInViewMode,
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
				<div className="preview-tools-icons">
					<div onClick={togglePreview}>
						<VerticalSplitIcon style={{ fontSize: "22px" }} />
					</div>
					<div onClick={toggleIsInViewMode}>
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
