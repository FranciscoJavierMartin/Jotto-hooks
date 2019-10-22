import moxios from 'moxios';
import { getSecretWord } from './hookActions';
import { DEFAULT_SECRET_WORD } from './../constants';

describe('moxios tests', () => {
  beforeEach(() => {
    moxios.install();

  });

  afterEach(() => {
    moxios.uninstall();
  });

  test('calls the getSecretWord callback on axios response', async () => {
    const secretWord = DEFAULT_SECRET_WORD;

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: secretWord,
      });
    });

    const mockSetSecretWord = jest.fn();
    await getSecretWord(mockSetSecretWord);
    expect(mockSetSecretWord).toHaveBeenCalledWith(secretWord);
  });
});