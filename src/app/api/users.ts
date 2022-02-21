import { DB_ORIGIN } from '../const';
import { store } from '../redux/store';
import { updateTokenTime } from '../redux/token-time';
import { removeUser, updateToken } from '../redux/user';
import { Endpoint } from '../types';
import { ILoginedUser } from './sign-in';

export async function getNewToken(): Promise<number | void> {
  const userId = store.getState().user.userId;
  const refresh = store.getState().user.refreshToken;
  if (userId) {
    try {
      const res = await fetch(`${DB_ORIGIN}${Endpoint.Users}/${userId}${Endpoint.Tokens}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${refresh}`,
        },
      });

      switch (res.status) {
        case 200:
          const newUserData = (await res.json()) as ILoginedUser;
          store.dispatch(updateToken(newUserData));
          store.dispatch(updateTokenTime(Date.now()));
          return res.status;
        case 401:
        case 403:
          store.dispatch(removeUser());
          location.reload();
        default:
          console.error('Unknown response STATUS', res.status, res.statusText);
          return res.status;
      }
    } catch {
      console.log('Error in catch of getNewToken function.');
    }
  } else {
    throw new Error('The function should be applied for authorized user only!');
  }
}
