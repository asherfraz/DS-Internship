import React from "react";
import gamedata from "./gamedata.json";

const GameContext = React.createContext();

const GameProvider = ({ children }) => {
	return (
		<GameContext.Provider value={{ gamedata }}>{children}</GameContext.Provider>
	);
};

const useGameData = () => {
	return React.useContext(GameContext);
};

export { GameProvider, useGameData };
