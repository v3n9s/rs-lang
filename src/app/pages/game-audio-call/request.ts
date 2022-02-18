import { ILoginedUser } from '../../api/sign-in';
import { DB_ORIGIN } from '../../const';
import { store } from '../../redux/store';
import { updateUser } from '../../redux/user';
import { BookParam } from '../../types';
import { IWordData } from './types';

enum Endpoint {
  Words = '/words',
  Users = '/users',
  Singin = '/signin',
  Tokens = '/tokens',
}

export async function getWordsList(group: number, page: number): Promise<IWordData[]> {
  try {
    const res = await fetch(
      `${DB_ORIGIN}${Endpoint.Words}?${BookParam.Group}=${group}&${BookParam.Page}=${page}`,
    );

    switch (res.status) {
      case 200:
        const wordsList = (await res.json()) as IWordData[];
        return wordsList;
      default:
        return [];
    }
  } catch {
    return [];
  }
}

// export async function getNewToken(func: Function, args: IArguments): Promise<unknown> {
//   const userId = store.getState().user.userId;
//   const token = store.getState().user.token;
//   const refresh = store.getState().user.refreshToken;
//   if (userId) {
//     try {
//       const res = await fetch(`${DB_ORIGIN}${Endpoint.Users}/${userId}${Endpoint.Tokens}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${refresh}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       switch (res.status) {
//         case 200:
//           console.error('200 >', res.status, res.statusText);
//           store.dispatch(updateUser((await res.json()) as ILoginedUser));
//           const result: unknown = await func(...args);
//           return result;
//         case 403:
//           console.error('403 >', res.status, res.statusText);
//           console.log(token);
//           console.log(refresh);
//           return [];
//         default:
//           console.error('XXX >', res.status, res.statusText);
//           console.log(token);
//           console.log(refresh);
//           return [];
//       }
//     } catch {
//       return [];
//     }
//   } else {
//     throw new Error('Function should be applied for authorized user only!');
//   }
// }

// export async function getUsersWords(): Promise<> {
//   const userId = store.getState().user.userId;
//   const token = store.getState().user.token;
//   const refresh = store.getState().user.refreshToken;
//   if (userId) {
//     try {
//       const res = await fetch(`${DB_ORIGIN}${Endpoint.Users}/${userId}${Endpoint.Words}`, {
//         method: 'GET',
//         headers: {
//           Authorization: `Bearer ${token}`,
//           Accept: 'application/json',
//           'Content-Type': 'application/json',
//         },
//       });

//       switch (res.status) {
//         case 200:
//           const wordsList = (await res.json()) as IWordData[];
//           console.error('200 >', res.status, res.statusText);
//           console.log(token);
//           console.log(refresh);
//           return wordsList;
//         case 403:
//           console.error('403 >', res.status, res.statusText);
//           console.log(token);
//           console.log(refresh);
//           const result  = getNewToken(getUsersWords, arguments);
//           return result;
//         default:
//           console.error('XXX >', res.status, res.statusText);
//           console.log(token);
//           console.log(refresh);
//           return [];
//       }
//     } catch {
//       return [];
//     }
//   }
// }

export async function getNewToken(): Promise<void> {
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
          store.dispatch(updateUser(newUserData));
          break;
        case 403:
          // Do logout here + message with showMessage function
          break;
        default:
          console.error('Unknown response STATUS', res.status, res.statusText);
          break;
      }
    } catch {
      console.log('Error in catch of getNewToken function.');
    }
  } else {
    throw new Error('The function should be applied for authorized user only!');
  }
}
