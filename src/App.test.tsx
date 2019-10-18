import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../test/testUitls'
import App from './App';

/**
 * Setup function for app component. 
 * @returns { ShallowWrapper }
 */
const setup = (): ShallowWrapper => {
  return shallow(<App/>);
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-app');
  expect(component.length).toBe(1);
});
