import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';

import { findByTestAttr } from '../../../test/testUitls';
import LanguagePicker from './LanguagePicker';

const mockSetlanguage = jest.fn();

const setup = (): ShallowWrapper => {
  return shallow(<LanguagePicker setLanguage={mockSetlanguage}/>);
}

test('renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttr(wrapper, 'component-language-picker');
  expect(component.exists()).toBe(true);
});

test('renders non-zero language icons', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  expect(languageIcons.length).toBeGreaterThan(0);
});

test('calls setLanguage prop upon click', () => {
  const wrapper = setup();
  const languageIcons = findByTestAttr(wrapper, 'language-icon');
  
  const firstIcon = languageIcons.first();
  firstIcon.simulate('click');

  expect(mockSetlanguage).toHaveBeenCalled();
});