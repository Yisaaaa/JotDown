import React from "react";
import "../css/Sidebar.css";
import MenuIcon from "@mui/icons-material/Menu";
import Note from "./Note";

export default function Sidebar({ sidebarActive, toggleSidebar }) {
	return (
		<div className={`sidebar ${sidebarActive ? "" : "hidden"}`}>
			<div className="hamburger-container">
				<span className="logo">MARKDOWN</span>
				<button className="hamburger" onClick={(e) => toggleSidebar()}>
					<MenuIcon fontSize="large"></MenuIcon>
				</button>
			</div>
			<ul className="notes">fdasf</ul>
		</div>
	);
}
