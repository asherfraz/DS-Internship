import { createBrowserRouter } from "react-router";
import HomePage from "./pages/HomePage";
import AddNotePage from "./pages/AddNotePage";
import ViewNotePage from "./pages/ViewNotePage";

const router = createBrowserRouter([
	{
		path: "/",
		element: <HomePage />,
	},
	{
		path: "/add-note",
		element: <AddNotePage />,
	},
	{
		path: "/note/:id",
		element: <ViewNotePage />,
	},
]);

export default router;
