import { useState, useEffect } from 'react';

function useForceUpdate(){
  const [val, setVal] = useState(0);
  return () => setVal(val => val + 1);
}

function KeyRect(props) {
  const { onPress, value, statusObj, keyPressed } = props
  const forceUpdate = useForceUpdate();

  const onClickOrPress = () => {
    onPress(value);
    forceUpdate();
  }

  useEffect(() => {
    if (keyPressed.toUpperCase() === value) {
      onClickOrPress();
    }
  }, [keyPressed]);

  return (
    <div
      className={value.length === 1 ? `key-rect ${statusObj[value]}` : `key-rect-special ${statusObj[value]}`}
      onClick={onClickOrPress}
    >
      {value === 'BACKSPACE' ? 'BACK' : value}
    </div>
  );
}

export default KeyRect;