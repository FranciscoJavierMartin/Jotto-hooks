import React from 'react';

interface IInputProps {
  secretWord: string;
}

const input = (props: IInputProps) => {
  const [ currentGuess, setCurrentGuess ] = React.useState<string>('');
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder="enter guess"
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}/>
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(event) => {
            event.preventDefault();
            setCurrentGuess('');
          }}>
          Submit
        </button>
      </form>
    </div>
  );
}

export default input;