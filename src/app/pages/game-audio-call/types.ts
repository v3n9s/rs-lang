export interface IWordData {
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
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
}

type TDifficulty = 'difficult' | 'learned' | 'notset' | '';

interface IGameInfo {
  total: [number, number];
  rightGuessesStreak: number;
}

interface IGameData {
  audiocall?: IGameInfo;
  sprint?: IGameInfo;
}

export interface IUserWordAddon {
  difficulty: TDifficulty;
  optional?: IGameData;
}

export interface IUserAggregatedWordData {
  _id: string;
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
  textExampleTranslate: string;
  textMeaningTranslate: string;
  wordTranslate: string;
  userWord?: IUserWordAddon;
}

type TTotalCount = { count: number };

export interface IUserAggrResponse {
  paginatedResults: Array<IUserAggregatedWordData>;
  totalCount: Array<TTotalCount>;
}
