import React from "react";
import "../css/Preview.css";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import ModeEditIcon from "@mui/icons-material/ModeEdit";

export default function Preview({
	tempNoteText,
	isInViewMode,
	toggleIsInViewMode,
}) {
	return (
		<div className="preview">
			<header className="preview-header">
				<label htmlFor="" className="preview-title">
					PREVIEW
				</label>
				{isInViewMode && (
					<div className="preview-tools-icons">
						<div onClick={toggleIsInViewMode}>
							<ModeEditIcon style={{ fontSize: "22px" }} />
						</div>
					</div>
				)}
			</header>
			<div className="preview-pane">
				<Markdown remarkPlugins={[remarkGfm]}>{tempNoteText}</Markdown>
			</div>
		</div>
	);
}
