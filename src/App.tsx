import React from 'react';
import Congrats from './components/congrats/Congrats';
import GuessedWords from './components/guessedWords/GuessedWords';
import LanguagePicker from './components/languagePicker/LanguagePicker';
import Input from './components/input/Input';
import hookActions from './actions/hookActions';
import LanguageContext from './contexts/LanguageContext';

/**
 * reducer to update state
 * @param { object } state - existing state
 * @param { object } action - contains 'type' and 'payload' properties for the
 *                            state update for example:
 *                            { type: "setSecretWord", payload: "party" }
 * @returns { object } - new state
 */
function reducer(state, action) {
  let newState;

  switch (action.type) {
    case 'setSecretWord':
      newState = { ...state, secretWord: action.payload };
      break;
    case 'setLanguage':
      newState = { ...state, language: action.payload };
      break;
    default:
      newState = { ...state };
      throw new Error(`Invalid action type: ${action.type}`);
  }

  return newState;
}
const App = () => {
  const [state, dispatch] = React.useReducer(reducer, {
    secretWord: null,
    language: 'en'
  });

  const setSecretWord = (secretWord: string) =>
    dispatch({
      type: 'setSecretWord',
      payload: secretWord
    });

  const setLanguage = (language: string) =>
    dispatch({
      type: 'setLanguage',
      payload: language
    });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord);
  }, []);

  let content = !state.secretWord ? (
    <div className='countainer' data-test='spinner'>
      <div className='spinner-border' role='status'>
        <span className='sr-only'>Loading...</span>
      </div>
      <p>Loading secret word</p>
    </div>
  ) : (
    <div className='container' data-test='component-app'>
      <h1>Jotto</h1>
      <LanguageContext.Provider value={state.language}>
        <LanguagePicker setLanguage={setLanguage}/>
        <Input secretWord={state.secretWord} />
      </LanguageContext.Provider>
    </div>
  );

  return content;
};

export default App;
