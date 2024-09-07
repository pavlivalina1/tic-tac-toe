import { useState } from "react";
import GameBoard from "./components/GameBoard";
import Player from "./components/Player";
import Log from "./components/Log";
import GameOver from "./components/GameOver";
import { WINNING_COMBINATIONS } from "./winning-combinations";

const PLAYERS = {
  X: "Player 1",
  O: "PLayer 2",
};

const INITIAL_GAME_BOARD = [
  [null, null, null],
  [null, null, null],
  [null, null, null],
];

function deriveActivePlayer(turns) {
  let currentPlayer = "X";

  if (turns.length > 0 && turns[0].player === "X") {
    currentPlayer = "O";
  }

  return currentPlayer;
}

function deriveGameBoard(turns) {
  let gameBoard = [...INITIAL_GAME_BOARD.map(array => [...array])];

  for (const turn of turns) {
    const { square, player } = turn;
    const { row, col } = square;

    gameBoard[row][col] = player;
  }

  return gameBoard;
}

function deriveGameOver(gameBoard, players) {
  let winner;
  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
      gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol =
      gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol =
      gameBoard[combination[2].row][combination[2].column];

    if (
      firstSquareSymbol !== null &&
      firstSquareSymbol === secondSquareSymbol &&
      firstSquareSymbol === thirdSquareSymbol
    ) {
      winner = players[firstSquareSymbol];
    }
  }
  return winner;
}

function App() {
  const [players, setPlayers] = useState(PLAYERS);
  const [turns, setTurns] = useState([]);

  const activePlayer = deriveActivePlayer(turns);
  const gameBoard = deriveGameBoard(turns);
  const winner = deriveGameOver(gameBoard, players);
  const hasDraw = turns.length === 9 && !winner;

  function handleSquareSelect(rowIndex, colIndex) {
    setTurns((prevTurns) => {
      let currentPlayer = deriveActivePlayer(prevTurns);

      let updatedTurns = [
        { square: { row: rowIndex, col: colIndex }, player: currentPlayer },
        ...prevTurns,
      ];

      return updatedTurns;
    });
  }

  function handlePlayersNameChange(name, symbol) {
    setPlayers((prevPlayers) => {
      return {
        ...prevPlayers,
        [symbol]: name,
      };
    });
  }

  function handleRematchClick() {
    setTurns([]);
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player
            initialName={PLAYERS.X}
            symbol="X"
            isActive={activePlayer === "X"}
            onPlayersChange={handlePlayersNameChange}
          />
          <Player
            initialName={PLAYERS.O}
            symbol="O"
            isActive={activePlayer === "O"}
            onPlayersChange={handlePlayersNameChange}
          />
        </ol>
        {(winner || hasDraw) && <GameOver winner={winner} onRematchClick={handleRematchClick}/>}
        <GameBoard onSquareSlect={handleSquareSelect} board={gameBoard} />
      </div>
      <Log turns={turns} />
    </main>
  );
}

export default App;
