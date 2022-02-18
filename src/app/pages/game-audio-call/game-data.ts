import { MAX_PAGE_INDEX, NOT_SET } from '../../const';
import { updateAudioCallData } from '../../redux/audiocall/data';
import { store } from '../../redux/store';
import { IBookNav } from '../../types';
import { getWordsList } from './request';
import { IWordData } from './types';
import { getArrayOfRandomNumber, shuffle } from './utils';

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
