import { useState } from 'react';
import GameBoard from './GameBoard';
import KeyBoard from './KeyBoard';
import '../App.css';

const threeLetterCVCWords = require('../wordLists/threeLetterCvcWordsArrayReduced.json');
const threeLetterWords = require('../wordLists/threeLetterWordsArray.json');
const fourLetterWords = require('../wordLists/fourLetterWordsArray.json');
const fiveLetterWords = require('../wordLists/fiveLetterWordsArray.json');
const sixLetterWords = require('../wordLists/sixLetterWordsArray.json');

const wordListsObj = {
  '3cvc': threeLetterCVCWords,
  '3': threeLetterWords,
  '4': fourLetterWords,
  '5': fiveLetterWords,
  '6': sixLetterWords
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
  'BACK' : 'default',
}

let guesses = [];
let currentGuess = "";

function useForceUpdate(){
  const [val, setVal] = useState(0);
  return () => setVal(val => val + 1);
}

function AppBody() {
  const [word, setWord] = useState(wordListsObj["3cvc"][Math.floor(Math.random() * wordListsObj["3cvc"].length)].toUpperCase());
  const [numLettersStr, setNumLettersStr] = useState("3cvc");
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
    for (var i = 0; i < currentGuess.length; i++) {
      const currentLetter = currentGuess[i];
      const guessLetter = [currentLetter];
      guess.push(guessLetter);
    }

    // populate incorrect statuses into guess array for letters that do not appear
    for (var i = 0; i < guess.length; i++) {
      if (!occurencesInWord[guess[i][0]]) {
        guess[i].push('incorrect');
      }
    }

    // populate correct statuses into guess array for letters are in the right place
    for (var i = 0; i < guess.length; i++) {
      if (occurencesInWord[guess[i][0]] && occurencesInWord[guess[i][0]].includes(i)) {
        guess[i].push('correct');
        const index = occurencesInWord[guess[i][0]].indexOf(i);
        occurencesInWord[guess[i][0]].splice(index, 1);
        if (!occurencesInWord[guess[i][0]].length) {
          delete occurencesInWord[guess[i][0]];
        }
      }
    }

    // populate statuses into guess array for letters that are in a different place or have no instances remaining
    for (var i = 0; i < guess.length; i++) {
      if (guess[i].length === 1) {
        if (occurencesInWord[guess[i][0]]) {
          guess[i].push('different-location');
          occurencesInWord[guess[i][0]] = occurencesInWord[guess[i][0]].slice(0, -1);
          if (!occurencesInWord[guess[i][0]].length) {
            delete occurencesInWord[guess[i][0]];
          }
        } else {
          guess[i].push('incorrect');
        }
      }
    }

    guesses.push(guess);
  }

  const performKeyPress = (key) => {
    if (wordGuessed) {
      setMessage("Press ENTER to start a new game");
    } else {
      setMessage("Play a word");
    }
    forceUpdate();
    if (key.length === 1 && !wordGuessed) {
      if (currentGuess.length < parseInt(numLettersStr)) {
        currentGuess += key;
      }
    } else {
      if (key === 'ENTER') {
        if (!wordGuessed && guesses.length < 6) {
          if (currentGuess.length === parseInt(numLettersStr)) {
            if (currentGuess === word) {
              setKeyStatus();
              addToGuesses();
              setWordGuessed(true);
              setMessage(`You guessed the word! The word was "${word}"!`)
              currentGuess = "";
            } else {
              if (wordListsObj[numLettersStr].includes(currentGuess)) {
                if (guesses.length < 5) {
                  setKeyStatus();
                  addToGuesses();
                  currentGuess = "";
                } else {
                  setKeyStatus();
                  addToGuesses();
                  setWordGuessed(true);
                  setMessage(`Nice try! The word was "${word}".`);
                  currentGuess = "";
                }
              } else {
                if (numLettersStr === "3cvc") {
                  setMessage("This is not an accepted consonant-vowel-consonant word");
                } else {
                  setMessage("This is not an accepted word");
                }
              }
            }
          } else {
              setMessage("Not enough letters");
          }
        } else {
          guesses = [];
          currentGuess = "";
          setWordGuessed(false);
          setMessage("Play a word");
          setWord(wordListsObj[numLettersStr][Math.floor(Math.random() * wordListsObj[numLettersStr].length)].toUpperCase())
          for (const key in keyStatusObj) {
            keyStatusObj[key] = 'default';
          }
        }
      } else if (key === 'BACK') {
        if (currentGuess.length) {
          currentGuess = currentGuess.slice(0, -1)
        }
      }
    }
    console.log(wordListsObj["3cvc"].length)
  };

  return (
    <div>
      <div className={`select-group${(currentGuess.length || guesses.length) ? ' invisible' : ''}`}>
        <label className="small-text" for="numberOfLetters">Choose a type of word:</label>
        <select
          value={numLettersStr}
          name="numberOfLetters"
          id="numberOfLetters"
          onChange={e => {
            setWord(wordListsObj[e.target.value][Math.floor(Math.random() * wordListsObj[e.target.value].length)].toUpperCase());
            setNumLettersStr(e.target.value);
            setMessage("Play a word");
          }}
        >
          <option value="3cvc">3 letters (consonant-vowel-consonant)</option>
          <option value="3">3 letters </option>
          <option value="4">4 letters</option>
          <option value="5">5 letters</option>
          <option value="6">6 letters</option>
        </select>
      </div>
      <GameBoard guesses={guesses} currentGuess={currentGuess} numLetters={parseInt(numLettersStr)}/>
      <p className={`small-text${(message === "Play a word") ? ' grey-text' : ''}`}>{message}</p>
      <KeyBoard onKeyPress={performKeyPress} statusObj={keyStatusObj}/>
    </div>
  );
}

export default AppBody;