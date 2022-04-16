import { useState } from 'react';
import GameBoard from './GameBoard';
import KeyBoard from './KeyBoard';
import '../App.css';

const fiveLetterWords = require('../wordLists/fiveLetterWordsArray.json');
const fiveLetterWordsMatthew = require('../wordLists/fiveLetterWordsArrayMatthew.json');
const fiveLetterWordsNatalie = require('../wordLists/fiveLetterWordsArrayNatalie.json');
const fiveLetterWordsKathryn = require('../wordLists/fiveLetterWordsArrayKathryn.json');

const wordListsObj = {
  '5M': [fiveLetterWordsMatthew, fiveLetterWords],
  '5N': [fiveLetterWordsNatalie, fiveLetterWords],
  '5K': [fiveLetterWordsKathryn, fiveLetterWords],
}

const keyStatusObj = {
  'A': 'default',
  'B': 'default',
  'C': 'default',
  'D': 'default',
  'E': 'default',
  'F': 'default',
  'G': 'default',
  'H': 'default',
  'I': 'default',
  'J': 'default',
  'K': 'default',
  'L': 'default',
  'M': 'default',
  'N': 'default',
  'O': 'default',
  'P': 'default',
  'Q': 'default',
  'R': 'default',
  'S': 'default',
  'T': 'default',
  'U': 'default',
  'V': 'default',
  'W': 'default',
  'X': 'default',
  'Y': 'default',
  'Z': 'default',
  'ENTER' : 'default',
  'BACKSPACE' : 'default',
}

let guesses = [];
let currentGuess = "";

function useForceUpdate(){
  const [, setVal] = useState(0);
  return () => setVal(val => val + 1);
}

function AppBody(props) {
  const { keyPressed } = props;
  const [playable, setPlayable] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [word, setWord] = useState(wordListsObj["5M"][0][wordIndex].toUpperCase());
  const [whoseClues, setWhoseClues] = useState("5M");
  const [message, setMessage] = useState("Play a word");
  const [wordGuessed, setWordGuessed] = useState(false);

  const forceUpdate = useForceUpdate();

  const setKeyStatus = () => {
    const wordUpper = word.toUpperCase();
    const currentGuessUpper = currentGuess.toUpperCase();
    for (var i = 0; i < currentGuessUpper.length; i++) {
      const currentLetter = currentGuessUpper[i]
      if (keyStatusObj[currentLetter] === 'default') {
        if (!wordUpper.includes(currentLetter)) {
          keyStatusObj[currentLetter] = 'incorrect';
        } else if (wordUpper[i] === currentLetter) {
          keyStatusObj[currentLetter] = 'correct';
        } else {
          keyStatusObj[currentLetter] = 'different-location';
        }
      } else if (keyStatusObj[currentLetter] === 'different-location') {
        if (wordUpper[i] === currentLetter) {
          keyStatusObj[currentLetter] = 'correct';
        }
      }
    }
  }

  const addToGuesses = () => {
    const wordUpper = word.toUpperCase();
    const occurencesInWord = {};
    const guess = [];

    // populate occurencesInWord object
    for (var i = 0; i < wordUpper.length; i++) {
      const currentLetter = wordUpper[i];
      if (currentGuess.includes(currentLetter)) {
        if (!occurencesInWord[currentLetter]) {
          occurencesInWord[currentLetter] = [i];
        } else {
          occurencesInWord[currentLetter].push(i);
        }
      }
    }

    // populate letters into guess array
    for (var j = 0; j < currentGuess.length; j++) {
      const currentLetter = currentGuess[j];
      const guessLetter = [currentLetter];
      guess.push(guessLetter);
    }

    // populate incorrect statuses into guess array for letters that do not appear
    for (var k = 0; k < guess.length; k++) {
      if (!occurencesInWord[guess[k][0]]) {
        guess[k].push('incorrect');
      }
    }

    // populate correct statuses into guess array for letters are in the right place
    for (var l = 0; l < guess.length; l++) {
      if (occurencesInWord[guess[l][0]] && occurencesInWord[guess[l][0]].includes(l)) {
        guess[l].push('correct');
        const index = occurencesInWord[guess[l][0]].indexOf(l);
        occurencesInWord[guess[l][0]].splice(index, 1);
        if (!occurencesInWord[guess[l][0]].length) {
          delete occurencesInWord[guess[l][0]];
        }
      }
    }

    // populate statuses into guess array for letters that are in a different place or have no instances remaining
    for (var m = 0; m < guess.length; m++) {
      if (guess[m].length === 1) {
        if (occurencesInWord[guess[m][0]]) {
          guess[m].push('different-location');
          occurencesInWord[guess[m][0]] = occurencesInWord[guess[m][0]].slice(0, -1);
          if (!occurencesInWord[guess[m][0]].length) {
            delete occurencesInWord[guess[m][0]];
          }
        } else {
          guess[m].push('incorrect');
        }
      }
    }

    guesses.push(guess);
  }

  const performKeyPress = (key) => {
    if (wordGuessed) {
      setMessage(wordIndex === wordListsObj[whoseClues][0].length - 1 ? "Press ENTER to finish" : "Press ENTER to continue to the next clue");
    } else {
      setMessage("Play a word");
    }
    forceUpdate();
    if (key.length === 1 && !wordGuessed) {
      if (currentGuess.length < 5) {
        currentGuess += key;
      }
    } else {
      if (key === 'ENTER') {
        if (!wordGuessed && guesses.length < 6) {
          if (currentGuess.length === 5) {
            if (currentGuess === word) {
              setKeyStatus();
              addToGuesses();
              setWordGuessed(true);
              setMessage(`You got your clue! Your clue is "${word}"!`)
              currentGuess = "";
            } else {
              if (wordListsObj[whoseClues][1].includes(currentGuess)) {
                if (guesses.length < 5) {
                  setKeyStatus();
                  addToGuesses();
                  currentGuess = "";
                } else {
                  setKeyStatus();
                  addToGuesses();
                  setWordGuessed(true);
                  setMessage(`Nice try! Your clue is "${word}".`);
                  currentGuess = "";
                }
              } else {
                setMessage("This is not an accepted word");
              }
            }
          } else {
              setMessage("Not enough letters");
          }
        } else {
          guesses = [];
          currentGuess = "";
          setWordGuessed(false);
          for (const key in keyStatusObj) {
            keyStatusObj[key] = 'default';
          }
          if (wordIndex < wordListsObj[whoseClues][0].length - 1) {
            setMessage("Play a word");
            setWord(wordListsObj[whoseClues][0][wordIndex + 1].toUpperCase());
            setWordIndex(wordIndex + 1);
          } else {
            setMessage("Congratulations! Happy Easter <3");
            setPlayable(false);
          }
        }
      } else if (key === 'BACKSPACE') {
        if (currentGuess.length) {
          currentGuess = currentGuess.slice(0, -1)
        }
      }
    }
  };

  return (
    <div>
      <div className={`select-group${(currentGuess.length || guesses.length || wordIndex > 0) ? ' invisible' : ''}`}>
        <label className="small-text" htmlFor="whoseClues">Select your name:</label>
        <select
          value={whoseClues}
          name="whoseClues"
          id="whoseClues"
          onChange={e => {
            setWhoseClues(e.target.value);
            setWord(wordListsObj[e.target.value][0][0].toUpperCase());
            setMessage("Play a word");
          }}
        >
          <option value="5M">Matthew</option>
          <option value="5N">Natalie</option>
          <option value="5K">Kathryn</option>
        </select>
      </div>
      {playable && <GameBoard guesses={guesses} currentGuess={currentGuess}/>}
      <p className={`small-text${(message === "Play a word") ? ' grey-text' : ''}`}>{message}</p>
      {playable && <KeyBoard onKeyPress={performKeyPress} statusObj={keyStatusObj} keyPressed={keyPressed}/>}
    </div>
  );
}

export default AppBody;