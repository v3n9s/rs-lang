import { DB_ORIGIN } from '../const';
import { replaceRequestHeaders } from './utils/replace-request-headers';
import { getAuthorizationHeaders } from './utils/get-authorization-headers';

interface IGetAggregatedWords {
  userId: string;
  group?: number;
  page?: number;
  wordsPerPage?: number;
  filter?: object;
}

export interface IWord {
  _id: string;
  audio: string;
  audioExample: string;
  audioMeaning: string;
  group: number;
  image: string;
  page: number;
  textExample: string;
  textExampleTranslate: string;
  textMeaning: string;
  textMeaningTranslate: string;
  transcription: string;
  word: string;
  wordTranslate: string;
}

export async function getAggregatedWords(
  { userId, group = 0, page = 0, wordsPerPage = 10, filter = {} }: IGetAggregatedWords,
): Promise<{
    words: Array<IWord>,
    total: number,
  }> {
  const res = await fetch(
    `${DB_ORIGIN}/users/${userId}/aggregatedWords?group=${group}&page=${page}&wordsPerPage=${wordsPerPage}&filter=${JSON.stringify(filter)}`,
    {
      headers: replaceRequestHeaders(getAuthorizationHeaders(), {}),
    },
  );
  const data = await res.json();
  const words = data[0].paginatedResults;
  const total = data[0].totalCount[0].count;
  return {
    words,
    total,
  };
}
