import stringsModule from './strings';
const { getStringByLanguage } = stringsModule;

const strings: any = {
  en: { submit: 'submit' },
  emoji: { submit: '🚀' },
  mermish: {},
}

describe('language string testing', () => {
  test('returns correct submit string for english', () => {
    const string = getStringByLanguage('en', 'submit', strings);
    expect(string).toBe('submit');
  });
  
  test('returns the correct submit string for emoji', () => {
    const string = getStringByLanguage('emoji', 'submit', strings);
    expect(string).toBe('🚀');
  });
  
  test('return english submit string when language does not exist', () => {
    const string = getStringByLanguage('notALanguage', 'submit', strings);
    expect(string).toBe('submit');
  });
  
  test('returns english submit string when submit key does not exist for language', () => {
    const string = getStringByLanguage('mermish', 'submit', strings);
    expect(string).toBe('submit');
  });
});
