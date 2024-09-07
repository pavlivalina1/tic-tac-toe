export default function ({ winner, onRematchClick }) {
  return (
    <div id="game-over">
      <h2>Game over!</h2>
      {!winner && <p>It's a draw</p>}
      {winner && <p>{winner} won</p>}
      <p>
        <button onClick={onRematchClick}>Rematch</button>
      </p>
    </div>
  );
}
