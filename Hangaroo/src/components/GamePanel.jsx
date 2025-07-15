import { useEffect, useState } from "react";
import hangedManImage from "../assets/hangedman-removebg-preview.png";
import { useGameData } from "../context/GameContext";
import toast from "react-hot-toast";

const GamePanel = () => {
	const totalLifes = 4;
	const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	const { gamedata } = useGameData();

	const [lifes, setLifes] = useState(totalLifes);
	const [losegames, setLosegames] = useState(0);
	const [wingames, setWingames] = useState(0);
	const [lastLose, setLastLose] = useState("");
	const [lastWin, setLastWin] = useState("");

	const [currentPuzzleIndex, setCurrentPuzzleIndex] = useState(() =>
		Math.floor(Math.random() * gamedata.length)
	);

	const [puzzle, setPuzzle] = useState(
		gamedata[currentPuzzleIndex]?.puzzleAnswer?.toUpperCase().split("") || []
	);
	const [puzzleState, setPuzzleState] = useState(puzzle.map(() => ""));
	const [uiUpdate, setUIUpdate] = useState(0);

	const currentPuzzle = gamedata[currentPuzzleIndex];

	console.log("\nPuzzle :", puzzle);
	console.log("PuzzleState :", puzzleState);
	console.log("Current Puzzle:", currentPuzzle);
	console.log("Puzzle Length: ", puzzle.length);
	console.log("Lifes: ", lifes);

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		if (userData) {
			setLosegames(userData.lose || 0);
			setWingames(userData.win || 0);
		}
	}, []);

	useEffect(() => {
		const handleKeyDown = (e) => {
			const letter = e.key.toUpperCase();
			if (alphabets.includes(letter)) {
				const button = document.querySelector(
					`button[data-letter="${letter}"]`
				);
				if (button && !button.disabled) {
					handleLetterClick({ target: button });
				}
			}
		};

		window.addEventListener("keydown", handleKeyDown);
		return () => window.removeEventListener("keydown", handleKeyDown);
	}, [puzzle, puzzleState, lifes]); // dependencies

	const updatePuzzle = () => {
		const newIndex = Math.floor(Math.random() * gamedata.length);
		setCurrentPuzzleIndex(newIndex);

		const newPuzzle = gamedata[newIndex].puzzleAnswer.toUpperCase().split("");
		setPuzzle(newPuzzle);
		setPuzzleState(newPuzzle.map(() => ""));
		setLifes(totalLifes);
		setUIUpdate((prev) => prev + 1);
	};

	const handleLetterClick = (e) => {
		e.target.disabled = true;
		const letter = e.target.innerText.toUpperCase();

		const isMatched = puzzle.includes(letter);

		if (!isMatched) {
			setLifes((prev) => {
				const newLifes = prev - 1;
				if (newLifes <= 0) {
					toast.error(
						`Game Over! The answer was: *${currentPuzzle.puzzleAnswer}*`,
						{
							duration: 4000,
						}
					);
					const newLose = losegames + 1;
					setLosegames(newLose);
					localStorage.setItem(
						"userData",
						JSON.stringify({ win: wingames, lose: newLose })
					);
					setLastLose(currentPuzzle.puzzleAnswer);
					updatePuzzle();
				}
				return newLifes;
			});
		}

		setPuzzleState((prevState) => {
			const updated = prevState.map((char, index) =>
				puzzle[index] === letter ? letter : char
			);

			const isComplete = updated.every((char) => char !== "");
			if (isComplete) {
				toast.success(
					`Congratulations! You solved: *${currentPuzzle.puzzleAnswer}*`,
					{
						duration: 3000,
					}
				);
				const newWin = wingames + 1;
				setWingames(newWin);
				localStorage.setItem(
					"userData",
					JSON.stringify({ win: newWin, lose: losegames })
				);
				setLastWin(currentPuzzle.puzzleAnswer);
				updatePuzzle();
			}

			return updated;
		});
	};

	// dynamic blur based on life
	const blurClasses = {
		4: "blur-2xl",
		3: "blur-md",
		2: "blur-sm",
		1: "blur-none",
		0: "", // fully visible on fail
	};

	return (
		<section
			key={uiUpdate}
			className="flex items-center justify-center h-[87vh] w-full bg-gray-100 text-gray-600 overflow-hidden"
		>
			{/* Hanged Man Image */}
			<div className="hidden md:w-[40%] h-full md:flex justify-center items-center border-r-2 bg-white border-gray-300 shadow-md">
				<img
					src={hangedManImage}
					alt="HangMan"
					className={`object-cover w-full h-full rounded-lg transition-all duration-300 ${blurClasses[lifes]}`}
				/>
			</div>

			{/* Game Panel */}
			<div className="w-full md:w-[60%] h-full flex justify-center items-center border-l-2 border-gray-300 shadow-md p-4">
				<div className="flex flex-col w-full h-full">
					{/* Header */}
					<div className="flex justify-between items-center flex-wrap">
						<div className="flex items-center mb-4 px-2 text-5xl font-extrabold gap-2">
							{Array.from({ length: totalLifes - lifes }).map((_, i) => (
								<span key={i} className="text-red-400">
									X
								</span>
							))}
						</div>
						<div className="text-gray-700 flex items-center mb-4 gap-2">
							<div className="text-lg font-semibold text-red-400">
								Losses: {losegames}
							</div>
							<span className="text-2xl font-bold">|</span>
							<div className="text-lg font-semibold text-green-600">
								Wins: {wingames}
							</div>
						</div>
					</div>

					<hr />

					{/* Puzzle Body */}
					<div className="flex flex-col justify-around items-center h-full overflow-y-hidden">
						{/* Puzzle Display */}
						<div className="flex flex-col justify-center items-center gap-4 my-4">
							<p className="text-gray-700 text-4xl md:text-5xl lg:text-6xl">
								Puzzle:{" "}
								{puzzleState.map((letter, i) => (
									<span key={i} className="border-b-2 mx-2 px-2 text-gray-800">
										{letter || ""}
									</span>
								))}
							</p>
							<p className="mt-4 text-xl md:text-2xl text-gray-500 text-center">
								Hint: {currentPuzzle.hint}
							</p>
						</div>

						{/* Alphabet Buttons */}
						<div className="flex flex-wrap justify-center gap-2">
							{alphabets.map((letter) => (
								<button
									key={letter}
									data-letter={letter}
									className="px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600 text-3xl lg:text-6xl font-semibold transition disabled:bg-green-600 disabled:opacity-50"
									onClick={handleLetterClick}
								>
									{letter}
								</button>
							))}
						</div>

						{/* History Section */}
						<div className="w-full flex flex-col justify-center gap-2 mt-4">
							<h2 className="px-3 py-1 bg-green-500 text-center text-white rounded-lg font-bold text-xl">
								History
							</h2>
							<div className="flex justify-between items-center gap-4">
								<div>
									<span className="font-bold">Last Lose Game:</span>
									<br />
									<span>{lastLose}</span>
								</div>
								<div>
									<span className="font-bold">Last Win Game:</span>
									<br />
									<span>{lastWin}</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
};

export default GamePanel;
