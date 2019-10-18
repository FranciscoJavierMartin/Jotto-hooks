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
  let mockSetCurrentGuess: jest.Mock<any, any> = jest.fn();
  let wrapper: ShallowWrapper;

  beforeEach(() => {
    mockSetCurrentGuess.mockClear();
    React.useState = jest.fn(() => ['', mockSetCurrentGuess]);
    wrapper = setup();
  });

  test('state updates with value of input box upon change', () => {
    const inputBox = findByTestAttr(wrapper, 'input-box');
    const inputWord = 'train';
    const mockEvent = { target: { value: inputWord } };
    inputBox.simulate('change', mockEvent);
    expect(mockSetCurrentGuess).toHaveBeenCalledWith(inputWord);
  });

  test('field is cleared upon submit button click', () => {
    const submitButton = findByTestAttr(wrapper, 'submit-button');
    submitButton.simulate('click', { preventDefault() {}});
    expect(mockSetCurrentGuess).toHaveBeenCalledWith('');
  });

});