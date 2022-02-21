import { store } from '../redux/store';

export const deleteUserWord = async (userId: string, wordId: string): Promise<void> => {
  const token = store.getState().user.token;
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  switch (rawResponse.status) {
    case 401:
      throw new Error('Access token is missing or invalid');
    case 204:
      return;
    default:
      throw new Error('Unknown Error!');
  }
};
