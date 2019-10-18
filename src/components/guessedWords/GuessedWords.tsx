import React from 'react';
import { IGuessedWord } from '../../common/interfaces';

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

  let contents =
    props.guessedWords.length === 0 ? (
      <span data-test='guess-instructions'>Try to guess the secret word!</span>
    ) : (
      <div data-test='guessed-words'>
        <h3>Guessed words</h3>
        <table className="table table-sm">
          <thead className="thead-ligth">
            <tr>
              <th>Guess</th>
              <th>Matching letters</th>
            </tr>
          </thead>
          <tbody>{guessedWordsRows}</tbody>
        </table>
      </div>
    );

  return <div data-test='component-guessed-words'>{contents}</div>;
};

export default GuessedWords;
