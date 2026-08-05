import Tile from "./Tile";

function Row({ guess, currentGuess, colors }) {
  const letters = (guess || currentGuess).padEnd(5).split("");

  return (
    <div className="row">
      {letters.map((letter, index) => (
        <Tile
          key={index}
          letter={letter}
          color={colors[index]}
        />
      ))}
    </div>
  );
}

export default Row;