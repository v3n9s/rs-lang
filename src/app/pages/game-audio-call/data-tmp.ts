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

// export const userWord01: IUserWord = {
//   difficulty: '',
//   optional: {},
// };

// export const userWord02: IUserWord = {
//   difficulty: 'notset',
//   optional: {
//     audiocall: {
//       total: [1, 2], // правильных / не правильных  ---- за все время
//       rightGuessesStreak: 1, // текущий стрик правильных
//     },
//   },
// };

// export const userWord03: IUserWord = {
//   difficulty: '',
//   optional: {
//     audiocall: {
//       total: [1, 2],
//       rightGuessesStreak: 1,
//     },
//     sprint: {
//       total: [3, 2],
//       rightGuessesStreak: 4,
//     },
//   },
// };
