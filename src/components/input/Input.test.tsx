import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../../test/testUitls';
import Input from './Input';

/**
 * Setup function for app component
 * @returns { ShallowWrapper }
 */
const setup = (): ShallowWrapper => {
  return shallow(<Input/>);
}

test('Input renders without error', () => {
  const wrapper: ShallowWrapper = setup();
  const inputComponent = findByTestAttr(wrapper, 'component-input');
  expect(inputComponent.length).toBe(1);
});