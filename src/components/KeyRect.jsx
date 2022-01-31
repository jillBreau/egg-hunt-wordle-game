import { useState } from 'react';

function useForceUpdate(){
  const [val, setVal] = useState(0);
  return () => setVal(val => val + 1);
}

function KeyRect(props) {
  const { onPress, value, statusObj } = props
  const forceUpdate = useForceUpdate();

  return (
    <div
      className={value.length === 1 ? `key-rect ${statusObj[value]}` : `key-rect-special ${statusObj[value]}`}
      onClick={() => {onPress(value); forceUpdate();}}
    >
      {value}
    </div>
  );
}

export default KeyRect;