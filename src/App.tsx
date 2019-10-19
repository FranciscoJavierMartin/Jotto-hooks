import React from 'react';
import Congrats from './components/congrats/Congrats';
import GuessedWords from './components/guessedWords/GuessedWords';
import Input from './components/input/Input';
import hookActions from './actions/hookActions';

/**
 * reducer to update state
 * @param { object } state - existing state
 * @param { object } action - contains 'type' and 'payload' properties for the 
 *                            state update for example: 
 *                            { type: "setSecretWord", payload: "party" }
 * @returns { object } - new state
 */
function reducer(state, action){
  let newState;

  switch(action.type){
    case 'setSecretWord':
      newState = { ...state, secretWord: action.payload }
      break;
    default:
      newState = { ...state };
      throw new Error(`Invalid action type: ${action.type}`)
  }

  return newState;
}
const App = () => {
  const [state, dispatch] = React.useReducer(
    reducer,
    { secretWord: null }
  );

  const setSecretWord = (secretWord: string) => dispatch({
    type: 'setSecretWord',
    payload: secretWord
  });

  React.useEffect(() => {
    hookActions.getSecretWord(setSecretWord)
  }, []);

  let content = !state.secretWord ?
    (
      <div className="countainer" data-test="spinner">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
        <p>Loading secret word</p>
      </div>
    ) : (
      <div className="container" data-test="component-app">
        <Input secretWord={state.secretWord}/>
      </div>
    );

  return content;
}

export default App;
