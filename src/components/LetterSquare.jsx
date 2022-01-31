function LetterSquare(props) {
  const { value, status } = props;
  return (
    <div className={`letter-square ${status}`}>
      {value}
    </div>
  );
}

export default LetterSquare;