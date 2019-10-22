import React from 'react';

interface ILanguagePickerProps {
  setLanguage: (lang: string) => void;
}

const LanguagePicker = (props: ILanguagePickerProps) => {
  const languages = [
    { code: 'en', symbol: '🇺🇸' },
    { code: 'emoji', symbol: '😊' }
  ];

  const languagueIcons = languages.map(lang =>
    (<span
      data-test='language-icon'
      onClick={() => props.setLanguage(lang.code)}
      key={lang.code}>
      {lang.symbol}
    </span>
  ));

  return <div data-test='component-language-picker'>{languagueIcons}</div>;
};

export default LanguagePicker;
