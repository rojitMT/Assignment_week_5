import { useState, useEffect } from "react";
import "./App.css";
import GameBoard from "./components/GameBoard";
import Keyboard from "./components/Keyboard";
import words from "./data/words";

function App() {
  const [solutionWord] = useState(
    words[Math.floor(Math.random() * words.length)]
  );

  const [currentGuess, setCurrentGuess] = useState("");

  const [pastGuesses, setPastGuesses] = useState([]);

  const [letterStatus, setLetterStatus] = useState({});

  const [gameStatus, setGameStatus] = useState("IN_PROGRESS");

  function evaluateGuess(guess) {
    const result = [];
    const solution = solutionWord.split("");

    // Green
    for (let i = 0; i < 5; i++) {
      if (guess[i] === solution[i]) {
        result[i] = "correct";
        solution[i] = null;
      }
    }

    // Yellow / Gray
    for (let i = 0; i < 5; i++) {
      if (result[i]) continue;

      const index = solution.indexOf(guess[i]);

      if (index !== -1) {
        result[i] = "present";
        solution[index] = null;
      } else {
        result[i] = "absent";
      }
    }

    return result;
  }

  function updateKeyboard(guess, colors) {
    const updated = { ...letterStatus };

    for (let i = 0; i < guess.length; i++) {
      const letter = guess[i];
      const color = colors[i];

      if (updated[letter] === "correct") continue;

      if (updated[letter] === "present" && color === "absent") continue;

      updated[letter] = color;
    }

    setLetterStatus(updated);
  }

  function submitGuess() {
    if (currentGuess.length !== 5) return;

    const colors = evaluateGuess(currentGuess);

    const updatedGuesses = [
      ...pastGuesses,
      {
        word: currentGuess,
        colors: colors,
      },
    ];

    setPastGuesses(updatedGuesses);

    updateKeyboard(currentGuess, colors);

    if (currentGuess === solutionWord) {
      setGameStatus("WON");
    } else if (updatedGuesses.length === 6) {
      setGameStatus("LOST");
    }

    setCurrentGuess("");
  }

  function handleInput(key) {
    if (gameStatus !== "IN_PROGRESS") return;

    if (key === "⌫") {
      setCurrentGuess((prev) => prev.slice(0, -1));
      return;
    }

    if (key === "ENTER") {
      submitGuess();
      return;
    }

    if (/^[A-Z]$/.test(key) && currentGuess.length < 5) {
      setCurrentGuess((prev) => prev + key);
    }
  }

  useEffect(() => {
    function physicalKeyboard(e) {
      if (e.key === "Backspace") {
        handleInput("⌫");
      } else if (e.key === "Enter") {
        handleInput("ENTER");
      } else {
        handleInput(e.key.toUpperCase());
      }
    }

    window.addEventListener("keydown", physicalKeyboard);

    return () => {
      window.removeEventListener("keydown", physicalKeyboard);
    };
  });

  return (
    <div className="app">
      <h1>React Wordle</h1>

      <GameBoard
        currentGuess={currentGuess}
        pastGuesses={pastGuesses}
      />

      <Keyboard
        onKeyPress={handleInput}
        letterStatus={letterStatus}
      />

      {gameStatus === "WON" && (
        <h2 className="win">🎉 You Won!</h2>
      )}

      {gameStatus === "LOST" && (
        <h2 className="lose">
          Game Over! Word: {solutionWord}
        </h2>
      )}
    </div>
  );
}

export default App;