import { store } from '../redux/store';

export enum UserWord {
  Difficult = 'difficult',
  Learned = 'learned',
  Notset = 'notset',
  Notfound = 'notfound',
}

const token = store.getState().user.token;

export const getUserWord = async (userId: string, wordId: string): Promise<UserWord> => {
  const rawResponsePromise = fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  return rawResponsePromise.then(async (rawResponse) => {
    switch (rawResponse.status) {
      case 401:
        throw new Error('Access token is missing or invalid');
      case 404:
        return UserWord.Notfound;
      case 200:
        const wordStatus = (await rawResponse.json()) as { difficulty: string };
        if (wordStatus.difficulty === 'difficult') {
          return UserWord.Difficult;
        } else if (wordStatus.difficulty === 'learned') {
          return UserWord.Learned;
        } else {
          return UserWord.Notset;
        }
      default:
        throw new Error('Unknown Error!');
    }
  });
};
