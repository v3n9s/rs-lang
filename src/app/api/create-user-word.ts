import { store } from '../redux/store';

const token = store.getState().user.token;
export const createUserWord = async ({ userId, wordId, word }) => {
  const rawResponse = await fetch(`https://<your-app-name>.com/users/${userId}/words/${wordId}`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(word),
  });
  const content = await rawResponse.json();
  return content;
};
