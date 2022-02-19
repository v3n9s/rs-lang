import { showMessage } from '../../components/authorization';
import { MAX_PAGE_INDEX, NOT_SET } from '../../const';
import { updateAudioCallData } from '../../redux/audiocall/data';
import { store } from '../../redux/store';
import { IBookNav } from '../../types';
import { getWordsList } from './request';
import { IWordData } from './types';
import { getArrayOfRandomNumber, shuffle } from './utils';

function composeWordsArray(words: IWordData[], options: IWordData[]): IWordData[] {
  const result: IWordData[] = [];

  words.forEach((word, index) => {
    result.push(word);
    const optionsCount = 4;
    result.push(...options.slice(index * optionsCount, index * optionsCount + optionsCount));
  });

  return result;
}

async function getRandomData(book: IBookNav): Promise<void> {
  console.log('..................random'); // -------------------------------------------------------

  const randomPagesCount = 3;
  const pages = getArrayOfRandomNumber(randomPagesCount, MAX_PAGE_INDEX);
  const data = await Promise.all([
    getWordsList(book.group, pages[0]),
    getWordsList(book.group, pages[1]),
    getWordsList(book.group, pages[2]),
  ]);

  if (data.every((res) => res.status === 200)) {
    const wordsList: IWordData[] = [];
    data.forEach((res) => {
      wordsList.push(...res.payload);
    });

    shuffle(wordsList);

    store.dispatch(updateAudioCallData(wordsList));
  } else {
    showMessage('Ошибка при загрузке слов');
  }
}

async function getDataByPage(book: IBookNav): Promise<void> {
  console.log(book);

  // TODO: 1. Empty array
  // TODO: 2. group 0-5
  // TODO: 3. group hard words

  // DATA in store should be
  //  1. WORD [index = 0]
  //  2. OPTIONS [indicies = 1 2 3 4] ... and so on
  console.log('..................by page'); // -------------------------------------------------------
  const targetPage = book.page;
  const randomPagesCount = 3;
  const pages = getArrayOfRandomNumber(randomPagesCount, MAX_PAGE_INDEX, targetPage);
  console.log(pages);

  const data = await Promise.all([
    getWordsList(book.group, pages[0]),
    getWordsList(book.group, pages[1]),
    getWordsList(book.group, pages[2]),
  ]);

  if (data.every((res) => res.status === 200)) {
    const MAX_QUESTIONS_NUM = 12;
    const wordsList: IWordData[] = [...data[0].payload.slice(0, MAX_QUESTIONS_NUM)];
    const optionsList: IWordData[] = [
      ...data[0].payload.slice(MAX_QUESTIONS_NUM),
      ...data[1].payload,
      ...data[2].payload,
    ];

    shuffle(wordsList);
    shuffle(optionsList);

    console.log(wordsList);
    console.log(optionsList);

    const result = composeWordsArray(wordsList, optionsList);

    console.log(result);

    store.dispatch(updateAudioCallData(result));
  } else {
    showMessage('Ошибка при загрузке слов');
  }
}

export async function getGameData(book: IBookNav): Promise<void> {
  if (book.group === NOT_SET) {
    throw new Error('Func getGameData should NOT receive -1 in group prop! Check arguments.');
  }

  const userId = store.getState().user.userId;

  if (userId) {
    // --- AUTH USER CASE ---
    if (book.page === NOT_SET) {
      // - from MENU -
      await getRandomData(book);
    } else {
      // - from BOOK PAGE -
      throw new Error('Not implemented');
    }
  } else {
    // --- UNauth USER CASE ---
    if (book.page === NOT_SET) {
      // - from MENU -
      await getRandomData(book);
    } else {
      // - from BOOK PAGE -
      await getDataByPage(book);
    }
  }
}
