import React from 'react';
import stringsModule from '../../helpers/strings';
import LanguageContext from '../../contexts/LanguageContext';

interface IInputProps {
  secretWord: string;
}

const input = (props: IInputProps) => {
  const [ currentGuess, setCurrentGuess ] = React.useState<string>('');
  const language = React.useContext(LanguageContext);
  return (
    <div data-test="component-input">
      <form className="form-inline">
        <input
          data-test="input-box"
          className="mb-2 mx-sm-3"
          type="text"
          placeholder={stringsModule.getStringByLanguage(language, 'gessInputPlaceholder')}
          value={currentGuess}
          onChange={(event) => setCurrentGuess(event.target.value)}/>
        <button
          data-test="submit-button"
          className="btn btn-primary mb-2"
          onClick={(event) => {
            event.preventDefault();
            setCurrentGuess('');
          }}>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

export default input;