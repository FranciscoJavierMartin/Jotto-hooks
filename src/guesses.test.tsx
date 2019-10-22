import React from 'react';
import { mount, ReactWrapper, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../test/testUitls';
import SuccessContext from './contexts/SuccessContext';
import guessedWordsContext from './contexts/GuessedWordsContext';
import Input from './components/input/Input';
import GuessedWords from './components/guessedWords/GuessedWords';
import GuessedWordsContext from './contexts/GuessedWordsContext';

function setup(secretWord:string='party', guessesWordsString: string[] = []): any[]{
  const wrapper = mount(
    <GuessedWordsContext.GuessedWordsProvider>
      <SuccessContext.SuccessProvider>
        <Input secretWord={secretWord}/>
      </SuccessContext.SuccessProvider>
    </GuessedWordsContext.GuessedWordsProvider>
  );

  const inputBox = findByTestAttr(wrapper, 'input-box');
  const submitButton = findByTestAttr(wrapper, 'submit-button');

  // prepopulate guessedWords context by simulating word guess
  guessesWordsString.map((word:string) => {
    const mockEvent = { target: { value: word } };
    inputBox.simulate('change', mockEvent);
    submitButton.simulate('click'); 
  });

  return [wrapper, inputBox, submitButton];
}

describe('test word guesses', () => {
  let wrapper: ReactWrapper;
  let inputBox: ShallowWrapper;
  let submitButton: ShallowWrapper;

  describe('non-empty guessedWords', () => {

    beforeEach(() => {
      [wrapper, inputBox, submitButton] = setup('party', ['agile']);
    });
  
    describe('correct guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party'}};
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
  
      test('Input component contains no children', () => {
        const inputComponent = findByTestAttr(wrapper, 'component-input');
        expect(inputComponent.children().length).toBe(0);
      });
  
      test('GuessedWords table row count reflects update guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });

    });
  
    describe('incorrect guess', () => {
      beforeEach(() => {
        const mockEvent = { target: { value: 'party' }};
        inputBox.simulate('change', mockEvent);
        submitButton.simulate('click');
      });
  
      test('Input box remains', () => {
        expect(inputBox.exists()).toBe(true);
      });
  
      test('GuessedWords table row count reflects update guess', () => {
        const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsTableRows.length).toBe(2);
      });

    });
  
  });

  describe('empty guessWords', () => {

    beforeEach(() => {
      [ wrapper, inputBox, submitButton ] = setup('party', []);
    });

    test('guessedWords shows correct guesses after incorrect guess', () => {
      const mockEvent = { target: { value: 'train' } };
      inputBox.simulate('change', mockEvent);
      submitButton.simulate('click');
      const guessedWordsTableRows = findByTestAttr(wrapper, 'guessed-word');
      expect(guessedWordsTableRows.length).toBe(1);
    });

  })

});