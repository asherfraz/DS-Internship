import { useEffect, useState } from "react";
import hangedManImage from "../assets/hangedman-removebg-preview.png";
import { useGameData } from "../context/GameContext";
import toast from "react-hot-toast";

const GamePanel = () => {
	const totalLifes = 4;
	const [lifes, setLifes] = useState(4);
	const [losegames, setlosegames] = useState(0);
	const [wingames, setwingames] = useState(0);
	const [lastlose, setLastlose] = useState("");
	const [lastwin, setLastwin] = useState("");

	useEffect(() => {
		const userData = JSON.parse(localStorage.getItem("userData"));
		if (userData) {
			setlosegames(userData.lose || 0);
			setwingames(userData.win || 0);
		}
	}, []);

	const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

	function getRandomPuzzle() {
		return Math.floor(Math.random() * gamedata.length);
	}

	let { gamedata } = useGameData();
	const randomPuzzle = getRandomPuzzle();
	const [currentPuzzle, setcurrentPuzzle] = useState(gamedata[randomPuzzle]);
	const [puzzle, setpuzzle] = useState(
		gamedata[randomPuzzle].puzzleAnswer.split("")
	);
	const [puzzleState, setPuzzleState] = useState(
		puzzle.length ? puzzle.map(() => "") : []
	);
	const [uiUpdate, setUIUpdate] = useState(0);

	console.log("Puzzle :", puzzle);
	console.log("PuzzleState :", puzzleState);
	// console.log("Current Puzzle:", currentPuzzle);
	console.log("Puzzle Length: ", puzzle.length);
	// console.log("Lifes: ", lifes);

	function updatePuzzle() {
		const randomPuzzleIndex = getRandomPuzzle();
		setcurrentPuzzle(gamedata[randomPuzzleIndex]);
		setpuzzle(gamedata[randomPuzzleIndex].puzzleAnswer.split(""));
		setPuzzleState(puzzle.length ? puzzle.map(() => "") : []);
		setLifes(4);
		setUIUpdate((prevKey) => prevKey + 1);
	}

	useEffect(() => {
		const handleKeyDown = (e) => {
			const letter = e.key.toUpperCase();

			if (alphabets.includes(letter)) {
				const button = document.querySelector(
					`button[data-letter="${letter}"]`
				);

				if (button && !button.disabled) {
					handleLetterClick({ target: button });
					// console.log(`>: Key pressed: ${button.innerText}`);
				}
			}
		};
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [puzzle, puzzleState, lifes]);

	const handleLetterClick = (e) => {
		e.target.disabled = true;
		let letter = e.target.innerText.toUpperCase();

		// match the letter with the puzzle
		let matched = puzzle.includes(letter);
		if (!matched) {
			setLifes((prev) => {
				const newLifes = prev - 1;

				if (newLifes <= 0) {
					toast.error(
						`Game Over! You've lost the puzzle: *${currentPuzzle.puzzleAnswer}*`,
						{ duration: 5000 }
					);
					setlosegames((prev) => prev + 1);
					localStorage.setItem(
						"userData",
						JSON.stringify({ win: wingames, lose: losegames + 1 })
					);
					setLastlose(currentPuzzle.puzzleAnswer);
					updatePuzzle();
				}

				return newLifes;
			});
		}

		// check for puzzle complete AFTER state update
		setPuzzleState((prevState) => {
			const updated = prevState.map((char, index) =>
				puzzle[index] === letter ? letter : char
			);
			const isComplete = updated.every((char) => char !== "");
			if (isComplete) {
				toast.success(
					`Congratulations! You've completed the *${currentPuzzle.puzzleAnswer}* puzzle!`,
					{ duration: 3000 }
				);
				setwingames((prev) => prev + 1);
				localStorage.setItem(
					"userData",
					JSON.stringify({ win: wingames + 1, lose: losegames })
				);
				setLastwin(currentPuzzle.puzzleAnswer);
				updatePuzzle();
			}
			return updated;
		});

		console.log(`Letter clicked: ${letter}`);
	};

	return (
		<section
			key={uiUpdate}
			className="flex items-center justify-center h-[80vh] w-full bg-gray-100 text-gray-600 overflow-hidden"
		>
			<div
				id="hanged-man"
				className="w-[40%] h-full flex justify-center items-center border-r-2 bg-white border-gray-300 shadow-md"
			>
				<img
					src={hangedManImage}
					alt="HangMan Image"
					className={`object-cover object-center  w-full h-full rounded-lg ${
						lifes === 4
							? "blur-2xl"
							: lifes === 3
							? "blur-md"
							: lifes === 2
							? "blur-sm"
							: lifes === 1
							? "blur-none"
							: ""
					}  transition-all duration-300 ease-in-out`}
				/>
			</div>
			<div
				id="game"
				className="w-[60%] h-full flex justify-center items-center border-l-2 border-gray-300   shadow-md p-4"
			>
				{/* column */}
				<div className="flex flex-col w-full h-full ">
					{/* Gamification Header */}
					<div className=" flex justify-between items-center flex-wrap">
						{/*  gamification - loses / wins */}
						<div className="flex justify-around items-center mb-4 px-2 text-5xl font-extrabold gap-2">
							{Array.from({ length: totalLifes - lifes }).map((_, index) => (
								<span
									key={index}
									className="text-red-400"
									role="img"
									aria-label="life"
								>
									X
								</span>
							))}
						</div>

						<div className="text-gray-700 flex justify-between items-center mb-4 gap-2">
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

					<div className="flex flex-col justify-around items-center h-full overflow-y-hidden">
						{/* Puzzle with hint */}
						<div className="flex flex-col justify-center items-center gap-4 my-4 ">
							<p className="text-gray-700 md:text-5xl lg:text-6xl ">
								Puzzle:
								{puzzleState.map((letter, index) => (
									<span
										key={index}
										className="border-b-2 mx-2 px-2 text-gray-800"
									>
										{letter || ""}
									</span>
								))}
							</p>
							<p className="mt-4 text-lg text-gray-500 text-center">
								Hint: {currentPuzzle.hint}
							</p>
						</div>

						{/* Alphabets */}
						<div className="flex flex-wrap shrink justify-center gap-2">
							{alphabets.map((letter) => (
								<button
									key={letter}
									data-letter={letter}
									className={`px-3 py-1 bg-green-500 text-white rounded-lg hover:bg-green-600
                                    text-lg lg:text-6xl font-semibold transition-colors duration-200 disabled:bg-green-600 disabled:opacity-50`}
									onClick={(e) => {
										handleLetterClick(e);
									}}
								>
									{letter}
								</button>
							))}
						</div>

						{/* History */}

						<div className="w-full flex flex-col justify-center gap-2">
							<h2 className="px-3 py-1 bg-green-500 text-center text-white rounded-lg font-bold text-xl">
								History
							</h2>
							<div className="flex justify-between items-center gap-4">
								{/* loses games */}
								<div>
									<span className="font-bold">Last Lose Game:</span>
									<br />
									<span>{lastlose}</span>
								</div>
								{/* Wins games */}
								<div>
									<span className="font-bold">Last Win Game:</span>
									<br />
									<span>{lastwin}</span>
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
