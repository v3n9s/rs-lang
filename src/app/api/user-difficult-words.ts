import { store } from '../redux/store';
import { IWord } from 'app/types';

interface IResponseWord {
  _id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}

export const getDifficultWord = async (userId: string): Promise<Array<IWord>> => {
  const token = store.getState().user.token;
  const filter = { 'userWord.difficulty': 'difficult' };
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/aggregatedWords?filter=${JSON.stringify(
      filter,
    )}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );

  switch (rawResponse.status) {
    case 401:
      throw new Error('Access token is missing or invalid');
    case 200:
      const data = await rawResponse.json();
      const responseWord = data[0].paginatedResults as IResponseWord[];
      console.log(responseWord);
      const newWords = responseWord.map((word) => {
        return {
          id: word._id,
          group: word.group,
          page: word.page,
          word: word.word,
          image: word.image,
          audio: word.audio,
          audioMeaning: word.audioMeaning,
          audioExample: word.audioExample,
          textMeaning: word.textMeaning,
          textExample: word.textExample,
          transcription: word.transcription,
          wordTranslate: word.wordTranslate,
          textMeaningTranslate: word.textMeaningTranslate,
          textExampleTranslate: word.textExampleTranslate,
        } as IWord;
      });
      console.log(newWords);
      return newWords;
    default:
      throw new Error('Unknown Error!');
  }
};
