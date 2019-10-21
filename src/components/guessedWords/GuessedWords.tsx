import React from 'react';
import { IGuessedWord } from '../../common/interfaces';
import LanguageContext from '../../contexts/LanguageContext';
import stringsModule from '../../helpers/strings';

export interface IGuessedWordsProps {
  guessedWords: IGuessedWord[];
}

const GuessedWords = (props: IGuessedWordsProps) => {
  const guessedWordsRows = props.guessedWords.map(
    (word: IGuessedWord, index: number) => (
      <tr data-test='guessed-word' key={index}>
        <td>{word.guessedWord}</td>
        <td>{word.letterMatchCount}</td>
      </tr>
    )
  );
  
  const language = React.useContext(LanguageContext);

  let contents =
    props.guessedWords.length === 0 ? (
      <span data-test='guess-instructions'>{stringsModule.getStringByLanguage(language, 'guessPrompt')}</span>
    ) : (
      <div data-test='guessed-words'>
        <h3>{stringsModule.getStringByLanguage(language, 'guessedWords')}</h3>
        <table className="table table-sm">
          <thead className="thead-ligth">
            <tr>
              <th>{stringsModule.getStringByLanguage(language, 'guessColumnHeader')}</th>
              <th>{stringsModule.getStringByLanguage(language, 'matchingLettersColumnHeader')}</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );

  return <div data-test='component-guessed-words'>{contents}</div>;
};

export default GuessedWords;
