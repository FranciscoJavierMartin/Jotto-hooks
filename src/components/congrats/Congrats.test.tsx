import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import Congrats, { ICongratsProps } from './Congrats';
import { findByTestAttr } from '../../../test/testUitls';

const defaultProps: ICongratsProps = {
    success: false
};

/**
 * Factory function to create a ShallowWrapper for the Congrats component.
 * @function setup
 * @param props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}): ShallowWrapper => {
    const setupProps = {...defaultProps, ...props};
    return shallow(<Congrats {...setupProps}/>)
};

test('renders without error', () => {
    const wrapper = setup();
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.length).toBe(1);
});

test('renders no text when `success` props is false', () => {
    const wrapper = setup({success: false});
    const component = findByTestAttr(wrapper, 'component-congrats');
    expect(component.text()).toBe('');
});

test('renders non-empty congrats message when sucess prop is true', () => {
    const wrapper = setup({success: true});
    const message = findByTestAttr(wrapper, 'component-congrats');
    expect(message.text().length).not.toBe(0);
});