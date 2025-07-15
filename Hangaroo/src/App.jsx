import { Toaster } from "react-hot-toast";
import "./App.css";
import Footer from "./components/Footer";
import GamePanel from "./components/GamePanel";
import Header from "./components/Header";
import { GameProvider } from "./context/GameContext";

function App() {
	return (
		<GameProvider>
			<Header />
			<main>
				<GamePanel />
			</main>
			<Footer />
			<Toaster />
		</GameProvider>
	);
}

export default App;
