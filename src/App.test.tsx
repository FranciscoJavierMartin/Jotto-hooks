import React from 'react';
import { ReactWrapper, mount } from 'enzyme';
import { findByTestAttrReactWrapper } from '../test/testUitls'
import App from './App';

import hookActions from './actions/hookActions';

const mockGetSecretWord = jest.fn();

/**
 * Setup function for app component. 
 * @param {string} secretWord - desired secretWord state value for test
 * @returns { ReactWrapper }
 */
const setup = (secretWord: string|null = 'party'): ReactWrapper => {
  mockGetSecretWord.mockClear();
  hookActions.getSecretWord = mockGetSecretWord;

  const mockUseReducer = jest.fn()
    .mockReturnValue([
      { secretWord, language: 'en' },
      jest.fn()
    ]);

  React.useReducer = mockUseReducer;

  return mount(<App/>);
}

test('App renders without error', () => {
  const wrapper = setup();
  const component = findByTestAttrReactWrapper(wrapper, 'component-app');
  expect(component.length).toBe(1);
});

describe('getSecretWord calls', () => {
  
  test('getSecretWord gets called on App mount', () => {
    setup();
    expect(mockGetSecretWord).toHaveBeenCalled();
  });

  test('secretWord does not update on App update', () => {
    const wrapper = setup();
    mockGetSecretWord.mockClear();
    wrapper.setProps();

    expect(mockGetSecretWord).not.toHaveBeenCalled();
  });
});

describe('secretWord is not null', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup('party');
  });

  test('renders app when secretWord is not null', () => {
    const appComponent = findByTestAttrReactWrapper(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(true);
  });

  test('does not render sinner when secretWord is not null', () => {
    const spinnerComponent = findByTestAttrReactWrapper(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(false);
  });
});

describe('secretWord is null', () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = setup(null);
  });

  test('does not render app when secretWord is null', () => {
    const appComponent = findByTestAttrReactWrapper(wrapper, 'component-app');
    expect(appComponent.exists()).toBe(false);
  });

  test('renders sinner when secretWord is null', () => {
    const spinnerComponent = findByTestAttrReactWrapper(wrapper, 'spinner');
    expect(spinnerComponent.exists()).toBe(true);
  });
});