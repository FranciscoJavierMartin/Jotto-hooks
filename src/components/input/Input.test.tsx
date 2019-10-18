import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../../test/testUitls';
import Input from './Input';

/**
 * Setup function for app component
 * @param {string} secreteWord - Word to guess 
 * @returns { ShallowWrapper }
 */
const setup = (secretWord:string = 'party'): ShallowWrapper => {
  return shallow(<Input secretWord={secretWord}/>);
}

test('Input renders without error', () => {
  const wrapper: ShallowWrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});

describe('state controlled input field', () => {

  test('state updates with value of input box upon change', () => {
    const mockSetCurrentGuess: jest.Mock<any, any> = jest.fn();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);

    const wrapper = setup();
    const inputBox = findByTestAttr(wrapper, 'input-box');

    const inputWord = 'train';
    const mockEvent = { target: { value: inputWord } };
    inputBox.simulate('change', mockEvent);

    expect(mockSetCurrentGuess).toHaveBeenCalledWith(inputWord);
  });
});