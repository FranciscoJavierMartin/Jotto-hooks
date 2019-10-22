import { URL_RANDOM_SERVER, DEFAULT_SECRET_WORD } from './../constants';
import axios from 'axios';

function promesa(x: string){
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({data: x})
    }, 50)
  })
}

export const getSecretWord = async (setSecretWord: any) => {
  const response: any = await Promise.race([promesa(DEFAULT_SECRET_WORD), axios.get(URL_RANDOM_SERVER)])
  setSecretWord(response.data);
}

export default {
  getSecretWord,
}