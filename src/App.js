import AppBody from './components/AppBody';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>{'A game based on Wordle with the option to vary the lengths of words.'}</p>
      </header>
      <body className="App-body">
        <div className="App-body-contents">
          <AppBody />
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
