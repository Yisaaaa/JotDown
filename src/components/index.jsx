import React from "react";
import ReactDOM from "react-dom/client";
import App from "../App.jsx";
import AuthPage from "../pages/AuthPage.jsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const rootEl = document.getElementById("root");

const root = ReactDOM.createRoot(rootEl);

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
	},
	{
		path: "/login",
		element: <AuthPage isLogin={true} />,
	},
	{
		path: "/create-account",
		element: <AuthPage isLogin={false} />,
	},
]);

root.render(
	<React.StrictMode>
		<RouterProvider router={router} />
	</React.StrictMode>
);

// root.render(<App />);
