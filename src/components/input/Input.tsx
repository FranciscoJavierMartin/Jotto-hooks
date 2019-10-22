import React from 'react';
import stringsModule from '../../helpers/strings';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import guessedWordsContext from '../../contexts/GuessedWordsContext';
import { getLetterMatchCount } from '../../helpers';

interface IInputProps {
  secretWord: string;
}

const Input = (props: IInputProps) => {
  const [ currentGuess, setCurrentGuess ] = React.useState<string>('');
  const [ success, setSuccess ] = SuccessContext.useSuccess();
  const [ guessedWords, setGuessedWords ] = guessedWordsContext.useGuessedWords();
  const language: string = React.useContext(LanguageContext);
  
  return !!success ? null : (
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
            const letterMatchCount = getLetterMatchCount(currentGuess, props.secretWord);
            const newGuessedWords = [...guessedWords, { guessedWord: currentGuess, letterMatchCount}];
            setGuessedWords(newGuessedWords);

            if(currentGuess === props.secretWord){
              setSuccess(true);
            }
            
            setCurrentGuess('');
          }}>
          {stringsModule.getStringByLanguage(language, 'submit')}
        </button>
      </form>
    </div>
  );
}

export default Input;