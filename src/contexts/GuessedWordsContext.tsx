import React from 'react';

const guessedWordsContext = React.createContext(undefined);

/**
 * @function useGuessedWords
 * @returns {Array} guessedWordsContext value, which is a state of [value, setter]
 */
export function useGuessedWords(): any[] {
  // useContext is a hook that returns the context value
  // In this case, the context value is an [value, setter] array for the context state
  // useContext also subscribes to changes, and will update any time the context value updates
  //     we've memoized this so that it will only update when the guessedWords value updates
  const context = React.useContext(guessedWordsContext);

  if(!context){
    throw new Error('useGuessedWords must be used within a GuessedWordsProvider');
  }

  return context;
}

/**
 * @function GuessedWordsProvider
 * @param {object} props - props to pass through from declared component
 * @returns {JSX.Element} Provider component
 */
export function GuessedWordsProvider(props: any){
  const [guessedWords, setGuessedWords] = React.useState([]);
  const value = React.useMemo(() => [guessedWords, setGuessedWords], [guessedWords]) as any[];
  return <guessedWordsContext.Provider value={value} {...props}/>
}

export default { GuessedWordsProvider, useGuessedWords }