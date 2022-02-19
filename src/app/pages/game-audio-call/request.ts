import { DB_ORIGIN } from '../../const';
import { BookParam, Endpoint } from '../../types';
import { IWordData } from './types';

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
