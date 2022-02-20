export enum HashPath {
  homePage = '#/home',
  bookPage = '#/book',
  audioCallPage = '#/audio-call',
  sprintPage = '#/sprint',
  statsPage = '#/stats',
  aboutTeamPage = '#/about-team',
}

export enum BookParam {
  Group = 'group',
  Page = 'page',
}

export interface IBookNav {
  group: number;
  page: number;
}

export enum Endpoint {
  Words = '/words',
  Users = '/users',
  Singin = '/signin',
  Tokens = '/tokens',
  AggregatedWords = '/aggregatedwords',
}

export interface IWord {
  id: string;
  group: number;
  page: number;
  word: string;
  image: string;
  audio: string;
  audioMeaning: string;
  audioExample: string;
  textMeaning: string;
  textExample: string;
  transcription: string;
  wordTranslate: string;
  textMeaningTranslate: string;
  textExampleTranslate: string;
}