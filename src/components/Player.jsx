import { useState } from "react";

export default function Player({ initialName, symbol, isActive, onPlayersChange }) {
  const [isEditing, setIsEditing] = useState(false);
  const [playerName, setPlayerName] = useState(initialName);

  function handleEditBtnClick() {
    setIsEditing((editing) => !editing);

    if(isEditing){
      onPlayersChange(playerName, symbol);
    }

  }

  function handleChange(event) {
    setPlayerName(event.target.value);
  }

  return (
    <li className={isActive ? "active" : undefined}>
      <span className="player">
        {!isEditing ? (
          <span className="player-name">{playerName}</span>
        ) : (
          <input type="text" value={playerName} onChange={handleChange} />
        )}

        <span className="player-symbol">{symbol}</span>
      </span>
      <button onClick={handleEditBtnClick}>
        {!isEditing ? "Edit" : "Save"}
      </button>
    </li>
  );
}
