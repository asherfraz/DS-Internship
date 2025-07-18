import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/add-note",
		element: <AddNotePage />,
	},
]);

export default router;
