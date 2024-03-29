const languageStrings: any = {
  en: {
    congrats: 'Congratulations! You guessed the word!',
    submit: 'Submit',
    guessPrompt: 'Try to guess the secret word!',
    guessInputPlaceholder: 'enter guess',
    guessColumnHeader: 'Guessed Words',
    guessedWords: 'Guesses',
    matchingLettersColumnHeader: 'Matching Letters'
  },
  emoji: {
    congrats: '🎯🎉',
    submit: '🚀',
    guessPrompt: '🤔🤫🔤',
    guessInputPlaceholder: '⌨️🤔',
    guessedWords: '🤷‍🔤',
    guessColumnHeader: '🤷‍',
    matchingLettersColumnHeader: '✅'
  }
};

function getStringByLanguage(
  languageCode: string,
  stringKey: string,
  strings: any = languageStrings
) {
  return !strings[languageCode] || !strings[languageCode][stringKey]
    ? strings.en[stringKey]
    : strings[languageCode][stringKey];
}

export default {
  getStringByLanguage
};
