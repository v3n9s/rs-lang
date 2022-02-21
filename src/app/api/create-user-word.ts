import { store } from '../redux/store';

export const createUserWord = async (
  userId: string,
  wordId: string,
  status: string,
): Promise<void> => {
  const token = store.getState().user.token;
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
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
