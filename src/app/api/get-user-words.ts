import { store } from '../redux/store';

const token = store.getState().user.token;

export const getUserWord = async ({ userId, wordId }) => {
  const rawResponse = await fetch(
    `https://<your-app-name>.herokuapp.com/users/${userId}/words/${wordId}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json',
      },
    },
  );
  const content = await rawResponse.json();

  console.log(content);
};
