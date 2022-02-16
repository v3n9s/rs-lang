import { IWord } from '../types';

export const getWords = async (group: number, page: number): Promise<IWord[]> => {
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/words?group=${group}&page=${page}`,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    },
  );
  const content = await rawResponse.json();
  return content;
};
