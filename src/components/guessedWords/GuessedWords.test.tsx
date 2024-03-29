import React from 'react';
import { shallow, ShallowWrapper } from 'enzyme';
import { findByTestAttr } from '../../../test/testUitls';
import GuessedWords from './GuessedWords';
import { IGuessedWord } from '../../common/interfaces';
import GuessedWordsContext from '../../contexts/GuessedWordsContext';

/**
 * Factory function to create a ShallowWrapper for the GuessedWords component.
 * @function setup
 * @param {array} guessedWords - guessedWords value specific to this setup
 * @returns {ShallowWrapper}
 */
const setup = (guessedWords: IGuessedWord[] = []): ShallowWrapper => {
    const mockUseGuessedWords = jest.fn().mockReturnValue([guessedWords, jest.fn()]);
    GuessedWordsContext.useGuessedWords = mockUseGuessedWords;
    return shallow(<GuessedWords/>);
};

describe('if there are no words guessed', () => {
    let wrapper: ShallowWrapper;

    beforeEach(() => {
        wrapper = setup();
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
    const guessedWords: IGuessedWord[] = [
        {guessedWord: 'train', letterMatchCount: 3},
        {guessedWord: 'agile', letterMatchCount: 1},
        {guessedWord: 'party', letterMatchCount: 5}
    ];

    beforeEach(() => {
        wrapper = setup(guessedWords);
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

describe('languagePicker', () => {
    
    test('correctly renders guess instructions string in English by default', () => {
        const wrapper = setup();
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('Try to guess the secret word!');
    });

    test('correctly renders guess instructions string in emoji', () => {
        const mockUserContext = jest.fn().mockReturnValue('emoji');
        React.useContext = mockUserContext;
        const wrapper = setup();
        const guessInstructions = findByTestAttr(wrapper, 'guess-instructions');
        expect(guessInstructions.text()).toBe('🤔🤫🔤');
    });

});