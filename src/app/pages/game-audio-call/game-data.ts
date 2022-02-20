import {
  DIFFICULT_GROUP_INDEX,
  GROUPS_COUNT,
  MAX_PAGE_INDEX,
  NOT_SET,
  WORDS_PER_PAGE,
} from '../../const';
import { updateAudioCallData } from '../../redux/audiocall/data';
import { store } from '../../redux/store';
import { IBookNav } from '../../types';
import { MAX_QUESTIONS_NUM } from './const';
import { getUsersAggregatedWordsList, getWordsList } from './request';
import { IUserAggregatedWordData, IWordData } from './types';
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

function converData(data: IUserAggregatedWordData[]): IWordData[] {
  return data.map((item) => {
    return {
      id: item._id,
      group: item.group,
      page: item.page,
      word: item.word,
      image: item.image,
      audio: item.audio,
      audioMeaning: item.audioExample,
      audioExample: item.audioMeaning,
      textMeaning: item.textMeaning,
      textExample: item.textExample,
      transcription: item.transcription,
      textExampleTranslate: item.textExampleTranslate,
      textMeaningTranslate: item.textMeaningTranslate,
      wordTranslate: item.wordTranslate,
    };
  });
}

function removeWordsRepetitions(words: IWordData[], target: IWordData[]): IWordData[] {
  const wordsId = words.map((item) => item.id);
  const result = target.filter((item) => !wordsId.includes(item.id));
  return result;
}

async function getRandomOptionList(): Promise<IWordData[]> {
  const randomGroup = Math.floor(Math.random() * GROUPS_COUNT);
  const randomPagesCount = 3;
  const pages = getArrayOfRandomNumber(randomPagesCount, MAX_PAGE_INDEX);

  const data = await Promise.all([
    getWordsList(randomGroup, pages[0]),
    getWordsList(randomGroup, pages[1]),
    getWordsList(randomGroup, pages[2]),
  ]);

  if (data.every((res) => res.status === 200)) {
    const wordsList: IWordData[] = [];
    data.forEach((res) => {
      wordsList.push(...res.payload);
    });

    shuffle(wordsList);

    return wordsList;
  }

  return [];
}

async function getRandomData(book: IBookNav): Promise<void> {
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
    store.dispatch(updateAudioCallData([]));
  }
}

async function getDataByGroupPage(book: IBookNav): Promise<void> {
  const targetPage = book.page;
  const randomPagesCount = 3;
  const pages = getArrayOfRandomNumber(randomPagesCount, MAX_PAGE_INDEX, targetPage);

  const data = await Promise.all([
    getWordsList(book.group, pages[0]),
    getWordsList(book.group, pages[1]),
    getWordsList(book.group, pages[2]),
  ]);

  if (data.every((res) => res.status === 200)) {
    const wordsList: IWordData[] = [...data[0].payload.slice(0, MAX_QUESTIONS_NUM)];
    const optionsList: IWordData[] = [
      ...data[0].payload.slice(MAX_QUESTIONS_NUM),
      ...data[1].payload,
      ...data[2].payload,
    ];

    shuffle(wordsList);
    shuffle(optionsList);

    const result = composeWordsArray(wordsList, optionsList);

    store.dispatch(updateAudioCallData(result));
  } else {
    store.dispatch(updateAudioCallData([]));
  }
}

async function getAuthDataByGroupPage(book: IBookNav): Promise<void> {
  if (book.group === DIFFICULT_GROUP_INDEX) {
    const filter = '{"userWord.difficulty":"difficult"}';

    const res = await getUsersAggregatedWordsList(filter);

    if (res.status === 200) {
      const difficultWordsList = converData(res.payload.slice(0, MAX_QUESTIONS_NUM));
      const wordsInRound = difficultWordsList.length;
      if (wordsInRound > 0) {
        shuffle(difficultWordsList);

        const rawOptionsList = await getRandomOptionList();
        const optionsList = removeWordsRepetitions(difficultWordsList, rawOptionsList);
        shuffle(optionsList);

        const result = composeWordsArray(difficultWordsList, optionsList);

        store.dispatch(updateAudioCallData(result));
      } else {
        store.dispatch(updateAudioCallData([]));
      }
    } else {
      store.dispatch(updateAudioCallData([]));
    }
  } else {
    const filter = '{"$or":[{"userWord.difficulty":null},{"userWord.difficulty":"notset"}]}';
    const wordsPerPage = (book.page + 1) * WORDS_PER_PAGE + 10; // 10 exra to include page mixin -> ...444545555...

    const res = await getUsersAggregatedWordsList(filter, book.group, undefined, wordsPerPage);
    if (res.status === 200) {
      const rawWords = converData(res.payload).filter((item) => item.page <= book.page);
      console.log(rawWords);

      const difficultWordsList = rawWords.slice(-MAX_QUESTIONS_NUM);

      const wordsInRound = difficultWordsList.length;
      if (wordsInRound > 0) {
        shuffle(difficultWordsList);

        const rawOptionsList = await getRandomOptionList();
        const optionsList = removeWordsRepetitions(difficultWordsList, rawOptionsList);
        shuffle(optionsList);

        const result = composeWordsArray(difficultWordsList, optionsList);

        store.dispatch(updateAudioCallData(result));
      } else {
        store.dispatch(updateAudioCallData([]));
      }
    } else {
      store.dispatch(updateAudioCallData([]));
    }
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
      await getAuthDataByGroupPage(book);
    }
  } else {
    // --- UNauth USER CASE ---
    if (book.page === NOT_SET) {
      // - from MENU -
      await getRandomData(book);
    } else {
      // - from BOOK PAGE -
      await getDataByGroupPage(book);
    }
  }
}
