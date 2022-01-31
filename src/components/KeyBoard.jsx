import KeyRect from './KeyRect';
import '../App.css';

function KeyBoard(props) {
  const { onKeyPress, statusObj, keyPressed } = props;
  const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'];
  const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'];
  const row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'BACKSPACE'];

  return (
    <div className="grid">
      <div className="grid-row">
        {row1.map((val) => 
          <KeyRect key={val} value={val} onPress={onKeyPress} statusObj={statusObj} keyPressed={keyPressed}/>
        )}
      </div>
      <div className="grid-row">
        {row2.map((val) => 
          <KeyRect key={val} value={val} onPress={onKeyPress} statusObj={statusObj} keyPressed={keyPressed}/>
        )}
      </div>
      <div className="grid-row">
        {row3.map((val) => 
          <KeyRect key={val} value={val} onPress={onKeyPress} statusObj={statusObj} keyPressed={keyPressed}/>
        )}
      </div>
    </div>
  );
}

export default KeyBoard;