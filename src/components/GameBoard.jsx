import LetterSquare from './LetterSquare';
import '../App.css';

function GameBoard(props) {
  const { guesses, currentGuess, numLetters } = props;
  const transformCurrentGuess = () => {
    const transformedArray = []
    for (var i = 0; i < currentGuess.length; i++) {
      transformedArray.push([currentGuess[i], 'default']);
    }
    return transformedArray;
  };
  const transformedCurrentGuess = transformCurrentGuess();

  const formOngoingGuesses = () => {
    const formedArray = []
    for (var i = 0; i < guesses.length; i++) {
      formedArray.push(guesses[i]);
    }
    formedArray.push(transformedCurrentGuess)
    return formedArray;
  }
  const ongoingGuesses = formOngoingGuesses();

  return (
    <div className="grid">
      {(Array.apply(null, Array(6)).map((x, rowIndex) => {
        return (
          <div className="grid-row" key={`row${rowIndex}`}>
            {
              !!ongoingGuesses[rowIndex] && ongoingGuesses[rowIndex].map((letter, index) => {
                return <LetterSquare key={`${rowIndex}-${index}-letter`} value={letter[0]} status={letter[1]} />
              })
            }
            {
              !!ongoingGuesses[rowIndex]
              ? (Array.apply(null, Array(numLetters - ongoingGuesses[rowIndex].length)).map((x, index) => {
                return <LetterSquare key={`${rowIndex}-${index}-blank`} value='' status={'default'} />
              }))
              : (Array.apply(null, Array(numLetters)).map((x, index) => {
                return <LetterSquare key={`${rowIndex}-${index}-blank`} value='' status={'default'} />
              }))
            }
          </div>
        )
      }))}
    </div>
  );
}

export default GameBoard;