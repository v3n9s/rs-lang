import { ILoginedUser } from '../../api/sign-in';
import { DB_ORIGIN, MAX_PAGE_INDEX, NOT_SET } from '../../const';
import { updateAudioCallData } from '../../redux/audiocall/data';
import { store } from '../../redux/store';
import { updateUser } from '../../redux/user';
import { BookParam, IBookNav } from '../../types';
import { IWordData } from './types';
import { getArrayOfRandomNumber, shuffle } from './utils';

enum Endpoint {
  Words = '/words',
  Users = '/users',
  Singin = '/signin',
  Tokens = '/tokens',
}

async function getWordsList(group: number, page: number): Promise<IWordData[]> {
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

export async function getGameData(book: IBookNav): Promise<void> {
  if (book.group === NOT_SET) {
    throw new Error('Func getGameData should NOT receive -1 in group prop! Check arguments.');
  }

  if (book.page === NOT_SET) {
    const randomPagesCount = 3;
    const pages = getArrayOfRandomNumber(randomPagesCount, MAX_PAGE_INDEX);
    const data = await Promise.all([
      getWordsList(book.group, pages[0]),
      getWordsList(book.group, pages[1]),
      getWordsList(book.group, pages[2]),
    ]);

    const wordsList: IWordData[] = [...data[0], ...data[1], ...data[2]];
    shuffle(wordsList);

    store.dispatch(updateAudioCallData(wordsList));
  } else {
    // Page defined
    store.dispatch(updateAudioCallData([])); // --- test emty array
  }

  // const userId = store.getState().user.userId;
  // if (userId) {
  //   // 2 user auth
  //   console.log('user id', userId);
  // } else {
  //   // 1 user anonim
  //   console.log('user id', userId);
  // }
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
