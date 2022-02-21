import { store } from '../redux/store';

export const updateUserWord = async (
  userId: string,
  wordId: string,
  status: string,
): Promise<void> => {
  const token = store.getState().user.token;
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'PUT',
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
      throw new Error('Unknown Error!');
  }
};
