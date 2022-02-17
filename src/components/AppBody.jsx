import { useState } from 'react';
import GameBoard from './GameBoard';
import KeyBoard from './KeyBoard';
import '../App.css';

const threeLetterCVCWords = require('../wordLists/threeLetterCvcWordsArray.json');
const threeLetterWords = require('../wordLists/threeLetterWordsArray.json');
const fourLetterWords = require('../wordLists/fourLetterWordsArray.json');
const fiveLetterWords = require('../wordLists/fiveLetterWordsArray.json');
const sixLetterWords = require('../wordLists/sixLetterWordsArray.json');
const threeLetterCVCWordsCommon = require('../wordLists/threeLetterCvcWordsArrayCommonPlus.json');
const threeLetterWordsCommon = require('../wordLists/threeLetterWordsArrayCommonPlus.json');
const fourLetterWordsCommon = require('../wordLists/fourLetterWordsArrayCommon.json');
const fiveLetterWordsCommon = require('../wordLists/fiveLetterWordsArrayCommon.json');
const sixLetterWordsCommon = require('../wordLists/sixLetterWordsArrayCommon.json');

const wordListsObj = {
  '3cvc': [threeLetterCVCWordsCommon, threeLetterCVCWords],
  '3': [threeLetterWordsCommon, threeLetterWords],
  '4': [fourLetterWordsCommon, fourLetterWords],
  '5': [fiveLetterWordsCommon, fiveLetterWords],
  '6': [sixLetterWordsCommon, sixLetterWords],
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
  const [word, setWord] = useState(wordListsObj["3cvc"][0][Math.floor(Math.random() * wordListsObj["3cvc"][0].length)].toUpperCase());
  const [numLettersStr, setNumLettersStr] = useState("3cvc");
  const [numGuessesStr, setNumGuessesStr] = useState("6");
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
        if (!wordGuessed && guesses.length < parseInt(numGuessesStr)) {
          if (currentGuess.length === parseInt(numLettersStr)) {
            if (currentGuess === word) {
              setKeyStatus();
              addToGuesses();
              setWordGuessed(true);
              setMessage(`You guessed the word! The word was "${word}"!`)
              currentGuess = "";
            } else {
              if (wordListsObj[numLettersStr][1].includes(currentGuess)) {
                if (guesses.length < parseInt(numGuessesStr) - 1) {
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
          setWord(wordListsObj[numLettersStr][0][Math.floor(Math.random() * wordListsObj[numLettersStr][0].length)].toUpperCase())
          for (const key in keyStatusObj) {
            keyStatusObj[key] = 'default';
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
        <div className={`selects-group${(currentGuess.length || guesses.length) ? ' invisible' : ''}`}>
        <div className="select-group">
          <label className="small-text" for="numberOfLetters">Type of word:</label>
          <select
            value={numLettersStr}
            name="numberOfLetters"
            id="numberOfLetters"
            onChange={e => {
              setWord(wordListsObj[e.target.value][0][Math.floor(Math.random() * wordListsObj[e.target.value][0].length)].toUpperCase());
              setNumLettersStr(e.target.value);
              setMessage("Play a word");
            }}
          >
            <option value="3cvc">3 letters (c-v-c)</option>
            <option value="3">3 letters </option>
            <option value="4">4 letters</option>
            <option value="5">5 letters</option>
            <option value="6">6 letters</option>
          </select>
        </div>
        <div className="select-group">
          <label className="small-text" for="numberOfLetters">Number of guesses:</label>
          <select
            value={numGuessesStr}
            name="numberOfGuesses"
            id="numberOfGuesses"
            onChange={e => {
              setNumGuessesStr(e.target.value);
              setMessage("Play a word");
            }}
          >
            <option value="6">6 guesses</option>
            <option value="7">7 guesses </option>
            <option value="8">8 guesses</option>
            <option value="9">9 guesses</option>
            <option value="10">10 guesses</option>
          </select>
        </div>
      </div>
      <GameBoard guesses={guesses} currentGuess={currentGuess} numLetters={parseInt(numLettersStr)} numGuesses={parseInt(numGuessesStr)}/>
      <p className={`small-text${(message === "Play a word") ? ' grey-text' : ''}`}>{message}</p>
      <KeyBoard onKeyPress={performKeyPress} statusObj={keyStatusObj} keyPressed={keyPressed}/>
    </div>
  );
}

export default AppBody;