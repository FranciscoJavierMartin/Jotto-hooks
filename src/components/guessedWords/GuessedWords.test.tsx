import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../../test/testUitls';
import GuessedWords, { IGuessedWordsProps } from './GuessedWords';

const defaultProps: IGuessedWordsProps = {
    guessedWords: [
        { guessedWord: 'train', letterMatchCount: 3}
    ],
};

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {object} props - Component props specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (props = {}): ShallowWrapper => {
    const setupProps: IGuessedWordsProps = { ...defaultProps, ...props};
    return shallow(<GuessedWords {...setupProps}/>);
};

describe('if there are no words guessed', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup({guessedWords: []});
    });
    
    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders instructions to guess a word', () => {
        const instructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(instructions.text().length).not.toBe(0);
    });
});

describe('if there are words guessed', () => {
    let wrapper: ShallowWrapper;
    const guessedWords = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}
    ];

    beforeEach(() => {
        wrapper = setup({guessedWords});
    });

    test('renders without error', () => {
        const component = findByTestAttr(wrapper, 'component-guessed-words');
        expect(component.length).toBe(1);
    });

    test('renders "guessed words" section', () => {
        const guessedWordsNode = findByTestAttr(wrapper, 'guessed-words');
        expect(guessedWordsNode.length).toBe(1);
    });

    test('correct number of guessed words', () => {
        const guessedWordsNodes = findByTestAttr(wrapper, 'guessed-word');
        expect(guessedWordsNodes.length).toBe(guessedWords.length);
    });

});