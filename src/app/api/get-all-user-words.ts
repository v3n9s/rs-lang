// import { store } from '../redux/store';
// import { UserWord } from './get-user-word';

// const token = store.getState().user.token;

// export const getUserWord = async (userId: string): Promise<UserWord[]> => {
//   const rawResponse = await fetch(
//     `https://rs-school-learnwords.herokuapp.com/users/${userId}/words`,
//     {
//       method: 'GET',
//       headers: {
//         Authorization: `Bearer ${token}`,
//         Accept: 'application/json',
//       },
//     },
//   );
//   switch (rawResponse.status) {
//     case 401:
//       throw new Error('Access token is missing or invalid');
//     case 404:
//       return UserWord.Notfound;
//     case 200:
//       const wordStatus = (await rawResponse.json()) as { difficulty: string };
//       if (wordStatus.difficulty === 'difficult') {
//         return UserWord.Difficult;
//       } else if (wordStatus.difficulty === 'learned') {
//         return UserWord.Learned;
//       } else {
//         return UserWord.Notset;
//       }
//     default:
//       throw new Error('Unknown Error!');
//   }
// };
