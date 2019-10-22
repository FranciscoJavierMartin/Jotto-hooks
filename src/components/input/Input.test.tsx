import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import { findByTestAttrReactWrapper } from '../../../test/testUitls';
import Input from './Input';
import LanguageContext from '../../contexts/LanguageContext';
import SuccessContext from '../../contexts/SuccessContext';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';

/**
 * Setup function for app component
 * @param {string} secreteWord - Word to guess 
 * @returns { ReactWrapper }
 */
const setup = (secretWord:string = 'party', language: string = 'en', success: boolean = false): ReactWrapper => {
  return mount(
      <LanguageContext.Provider value={language}>
        <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
          <GuessedWordsContext.GuessedWordsProvider>
            <Input secretWord={secretWord}/>
          </GuessedWordsContext.GuessedWordsProvider>
        </SuccessContext.SuccessProvider>
      </LanguageContext.Provider>
    );
}

test('Input renders without error', () => {
  const wrapper: ReactWrapper = setup();
  const inputComponent = findByTestAttrReactWrapper(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {
  let mockSetCurrentGuess: jest.Mock<any, any> = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttrReactWrapper(wrapper, 'input-box');
    const inputWord = 'train';
    const mockEvent = { target: { value: inputWord } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith(inputWord);
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttrReactWrapper(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });

});

describe('languagePicker', () => {

  test('correctly renders submit string in english', () => {
    const wrapper = setup(undefined,'');
    const submitButton = findByTestAttrReactWrapper(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('Submit');
  });

  test('correctly renders congrats string in emoji', () => {
    const wrapper = setup(undefined, 'emoji');
    const submitButton = findByTestAttrReactWrapper(wrapper, 'submit-button');
    expect(submitButton.text()).toBe('🚀');
  });

});

test('input component does not show when success is true', () => {
  const wrapper = setup('party', undefined, true);
  expect(wrapper.isEmptyRender()).toBe(true);
});