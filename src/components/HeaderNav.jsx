import React from "react";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import DeleteIcon from "@mui/icons-material/Delete";
import LogoutIcon from "@mui/icons-material/Logout";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import "../css/HeaderNav.css";

function HeaderNav({ iconsOnly, createNote, deleteNote }) {
	return (
		<div className="header-nav">
			<button
				onClick={(e) => {
					e.stopPropagation();
					createNote();
				}}
				className="create-note btn-header"
			>
				<NoteAddIcon fontSize="large" />
				{!iconsOnly && <span>Create Note</span>}
			</button>
			<button
				onClick={(e) => {
					e.stopPropagation();
					deleteNote();
				}}
				className="delete-note btn-header"
			>
				<DeleteIcon fontSize="large" />
				{!iconsOnly && <span>Delete</span>}
			</button>
			<button
				className="sign-out-btn btn-header"
				onClick={() => signOut(auth)}
			>
				<LogoutIcon fontSize="large" />
				{!iconsOnly && <span>Sign out</span>}
			</button>
		</div>
	);
}

export default HeaderNav;
