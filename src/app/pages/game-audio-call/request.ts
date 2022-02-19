import { DB_ORIGIN } from '../../const';
import { BookParam, Endpoint } from '../../types';
import { IWordData } from './types';

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
