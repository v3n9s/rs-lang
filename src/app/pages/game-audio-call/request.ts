import { getNewToken } from '../../api/users';
import { DB_ORIGIN } from '../../const';
import { store } from '../../redux/store';
import { BookParam, Endpoint } from '../../types';
import { IUserAggregatedWordData, IUserAggrResponse, IWordData } from './types';

interface IDataResponse<T> {
  status: number;
  msg: string;
  payload: T;
}

export async function getWordsList(
  group: number,
  page: number,
): Promise<IDataResponse<IWordData[]>> {
  try {
    const res = await fetch(
      `${DB_ORIGIN}${Endpoint.Words}?${BookParam.Group}=${group}&${BookParam.Page}=${page}`,
    );

    switch (res.status) {
      case 200:
        const wordsList = (await res.json()) as IWordData[];
        return {
          status: res.status,
          msg: 'Ok',
          payload: wordsList,
        };
      default:
        return {
          status: 0,
          msg: 'Unhandled status in function getWordsList',
          payload: [],
        };
    }
  } catch {
    throw new Error('Error in catch of getWordsList function.');
  }
}

export async function getUsersAggregatedWordsList(
  filter?: string,
  group?: number,
  page?: number,
  wordsPerPage?: number,
): Promise<IDataResponse<IUserAggregatedWordData[]>> {
  const userId = store.getState().user.userId;
  const token = store.getState().user.token;

  if (userId) {
    const url: string = `${DB_ORIGIN}${Endpoint.Users}/${userId}${Endpoint.AggregatedWords}`;
    let searchParamsArr: string[] = [];
    if (Number.isInteger(group)) {
      searchParamsArr.push(`group=${group}`);
    }
    if (Number.isInteger(page)) {
      searchParamsArr.push(`page=${page}`);
    }
    if (filter) {
      searchParamsArr.push(`filter=${filter}`);
    }
    if (wordsPerPage) {
      searchParamsArr.push(`wordsPerPage=${wordsPerPage}`);
    }

    let searchParams = '';
    if (searchParamsArr.length) {
      searchParams = `?${searchParamsArr.join('&')}`;
    }

    try {
      const res = await fetch(`${url}${searchParams}`, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const successfulOperation = 200;
      const accessTokenIsMissingOrInvalid = 401;

      switch (res.status) {
        case successfulOperation:
          const data = (await res.json()) as IUserAggrResponse[];

          return {
            status: res.status,
            msg: 'Ok',
            payload: data[0].paginatedResults,
          };
        case accessTokenIsMissingOrInvalid:
          const newToken = await getNewToken();
          if (newToken === successfulOperation) {
            const result = await getUsersAggregatedWordsList(...arguments);
            return result;
          }
          return {
            status: 0,
            msg: 'Invalid refresh token',
            payload: [],
          };
        default:
          return {
            status: 0,
            msg: 'Unhandled status in function getWordsList',
            payload: [],
          };
      }
    } catch {
      throw new Error('Error in catch of getUsersAggregatedWordsList function.');
    }
  } else {
    throw new Error('The function should be applied for authorized user only!');
  }
}

// interface IUserWord {
//   id: string,
//   difficulty: string,
//   wordId: string,
// }

export async function getUserWord(wordId: string): Promise<IDataResponse<null>> {
  const userId = store.getState().user.userId;
  const token = store.getState().user.token;
  try {
    const res = await fetch(`${DB_ORIGIN}${Endpoint.Users}/${userId}${Endpoint.Words}/${wordId}`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    switch (res.status) {
      case 200:
        const data = await res.json();
        console.log(data);

        return {
          status: res.status,
          msg: 'Ok',
          payload: null,
        };
      default:
        return {
          status: 0,
          msg: 'Unhandled status in function getUserWord',
          payload: null,
        };
    }
  } catch {
    throw new Error('Error in catch of getUserWord function.');
  }
}
