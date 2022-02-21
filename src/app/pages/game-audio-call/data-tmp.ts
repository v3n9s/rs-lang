export type TDifficulty = 'difficult' | 'learned' | 'notset' | '' | null;

export interface IGameInfo {
  total: [number, number]; // answers: [ wrong , right ]
  rightGuessesStreak: number;
}

export interface IGameData {
  audiocall?: IGameInfo;
  sprint?: IGameInfo;
}

export interface IUserWord {
  difficulty: TDifficulty;
  optional?: IGameData;
}
