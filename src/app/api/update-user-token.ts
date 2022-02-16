// import { store } from '../redux/store';
import { ILoginedUser } from './sign-in';
// const userId = store.getState().user.userId;

export const updateUserToken = async (userId: string): Promise<ILoginedUser> => {
  const rawResponse = await fetch(
    `https://rs-school-learnwords.herokuapp.com/users/${userId}/tokens`,
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
