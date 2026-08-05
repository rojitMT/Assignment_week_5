const keyboardRows = [
  ["Q","W","E","R","T","Y","U","I","O","P"],
  ["A","S","D","F","G","H","J","K","L"],
  ["ENTER","Z","X","C","V","B","N","M","⌫"]
];

function Keyboard({ onKeyPress, letterStatus }) {
  return (
    <div className="keyboard">

      {keyboardRows.map((row, rowIndex) => (

        <div
          key={rowIndex}
          className="keyboard-row"
        >

          {row.map((key) => (

            <button
              key={key}
              className={`key ${letterStatus[key] || ""}`}
              onClick={() => onKeyPress(key)}
            >
              {key}
            </button>

          ))}

        </div>

      ))}

    </div>
  );
}

export default Keyboard;