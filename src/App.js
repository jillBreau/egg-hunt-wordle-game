import { useState } from 'react';
import AppBody from './components/AppBody';
import './App.css';

function App() {
  const [keyPressed, setKeyPressed] = useState("");

  const handleKeyDown = (event) => {
    setKeyPressed(event.key);
  }

  const handleKeyUp = (event) => {
    setKeyPressed("");
  }

  return (
    <div className="App" tabIndex="0" onKeyDown={handleKeyDown} onKeyUp={handleKeyUp}>
      <header className="App-header">
        <p>{'A game based on Wordle with the option to vary the lengths of words.'}</p>
      </header>
      <body className="App-body">
        <div className="App-body-contents">
          <AppBody keyPressed={keyPressed}/>
        </div>
      </body>
      <footer className="App-footer">
        <p>{'All credits for the concept of the game go to '}
          <a className="link" href="https://www.powerlanguage.co.uk/wordle/">Wordle</a>.
        </p>
      </footer>
    </div>
  );
}

export default App;
