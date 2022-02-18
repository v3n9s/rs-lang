import { store } from '../redux/store';

const token = store.getState().user.token;
export const createUserWord = async (
  obj: { userId: string; wordId: string; word: string },
  status: string,
): Promise<void> => {
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${obj.userId}/words/${obj.wordId}`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        difficulty: status,
        optional: {},
      }),
    },
  );
  switch (rawResponse.status) {
    case 400:
      throw new Error('Bad request');
    case 401:
      throw new Error('Access token is missing or invalid');
    case 200:
      return;
    default:
      console.log(rawResponse.status);
      rawResponse.headers.forEach((el) => console.log(el));
      throw new Error('Unknown Error!');
  }
};
