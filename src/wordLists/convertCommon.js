var fs = require('fs');
var allWordsText = fs.readFileSync("./common.txt", 'utf-8');
var allWordsArray = allWordsText.split('\n');
var allWordsArrayFixed = [];
for (const i in allWordsArray) {
  allWordsArrayFixed.push(allWordsArray[i].trim())
}

var threeLetterCvcWords = [];
var threeLetterWords = [];
var fourLetterWords = [];
var fiveLetterWords = [];
var sixLetterWords = [];

const consonants = ['Q', 'W', 'R', 'T', 'Y', 'P', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X', 'C', 'V', 'B', 'N', 'M'];
const vowels = ['E', 'U', 'I', 'O', 'A', 'Y'];

for (const i in allWordsArrayFixed) {
  if (allWordsArrayFixed[i].length === 3) {
    if (consonants.includes(allWordsArrayFixed[i][0])
    && vowels.includes(allWordsArrayFixed[i][1])
    && consonants.includes(allWordsArrayFixed[i][2])) {
      threeLetterCvcWords.push(allWordsArrayFixed[i]);
    }
  }
  if (allWordsArrayFixed[i].length === 3) {
    threeLetterWords.push(allWordsArrayFixed[i]);
  }
  if (allWordsArrayFixed[i].length === 4) {
    fourLetterWords.push(allWordsArrayFixed[i]);
  }
  if (allWordsArrayFixed[i].length === 5) {
    fiveLetterWords.push(allWordsArrayFixed[i]);
  }
  if (allWordsArrayFixed[i].length === 6) {
    sixLetterWords.push(allWordsArrayFixed[i]);
  }
}

fs.writeFile('./threeLetterCvcWordsArrayCommon.json', JSON.stringify(threeLetterCvcWords), function(){});
fs.writeFile('./threeLetterWordsArrayCommon.json', JSON.stringify(threeLetterWords), function(){});
fs.writeFile('./fourLetterWordsArrayCommon.json', JSON.stringify(fourLetterWords), function(){});
fs.writeFile('./fiveLetterWordsArrayCommon.json', JSON.stringify(fiveLetterWords), function(){});
fs.writeFile('./sixLetterWordsArrayCommon.json', JSON.stringify(sixLetterWords), function(){});