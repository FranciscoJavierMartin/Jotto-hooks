import React from 'react';
import { shallow, ShallowWrapper, mount, ReactWrapper } from 'enzyme';
import Congrats from './Congrats';
import LanguageContext from '../../contexts/LanguageContext';
import { findByTestAttr } from '../../../test/testUitls';
import SuccessContext from '../../contexts/SuccessContext';



/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param { object } testValues - Context values specific to this setup
 * @returns {ReactWrapper}
 */
const setup = (success: boolean = false, language: string = 'en'): ReactWrapper => {    
    return mount(
        <LanguageContext.Provider value={language}>
            <SuccessContext.SuccessProvider value={[success, jest.fn()]}>
                <Congrats/>
            </SuccessContext.SuccessProvider>
        </LanguageContext.Provider>
    );
};

describe('LanguagePicker', () => {
    test('correctly renders congrats string in english', () => {
        const wrapper = setup(true);
        expect(wrapper.text()).toBe('Congratulations! You guessed the word!');
    });

    test('correctly renders congrats string in empji', () => {
        const wrapper = setup(true, 'emoji');
        expect(wrapper.text()).toBe('🎯🎉');
    });
});

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` is false', () => {
    const wrapper = setup(false);
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when sucess is true', () => {
    const wrapper = setup(true);
    const message = findByTestAttr(wrapper, 'component-congrats');
    expect(message.text().length).not.toBe(0);
});