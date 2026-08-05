import Row from "./Row";

function GameBoard({ currentGuess, pastGuesses }) {
  return (
    <div className="board">
      {[...Array(6)].map((_, index) => {
        const guessData = pastGuesses[index];

        return (
          <Row
            key={index}
            guess={guessData ? guessData.word : ""}
            colors={guessData ? guessData.colors : []}
            currentGuess={
              index === pastGuesses.length ? currentGuess : ""
            }
          />
        );
      })}
    </div>
  );
}

export default GameBoard;