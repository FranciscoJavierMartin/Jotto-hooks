import React from 'react';

interface ILanguagePickerProps {
  setLanguage: (lang: string) => any;
}
const languagePicker = ({ setLanguage }: ILanguagePickerProps) => {
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' }
  ];

  const languagueIcons = languages.map(lang => {
    <span
      data-test='language-icon'
      onClick={() => setLanguage(lang.code)}
      key={lang.code}>
      {lang.symbol}
    </span>;
  });

  return <div data-test='component-language-picker'>{languagueIcons}</div>;
};

export default languagePicker;
