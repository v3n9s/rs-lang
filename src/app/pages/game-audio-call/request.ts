import { DB_ORIGIN, MAX_PAGE_INDEX, NOT_SET } from '../../const';
import { updateAudioCallData } from '../../redux/audiocall/data';
import { store } from '../../redux/store';
import { BookParam, IBookNav } from '../../types';
import { IWordData } from './types';
import { getArrayOfRandomNumber, shuffle } from './utils';

enum Endpoint {
  Words = '/words',
  Users = '/users',
  Singin = '/signin',
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
    throw new Error("Func getGameData shouldn't receive -1 in group prop! Check arguments.");
  }

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

  const userId = store.getState().user.userId;
  if (userId) {
    // 2 user auth
    console.log('user id', userId);
  } else {
    // 1 user anonim
    console.log('user id', userId);
  }
}
