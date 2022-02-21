import { currGame } from '.';
import { updateUserWord } from '../../api/update-user-word';
import { store } from '../../redux/store';
import { getUserWord } from './request';

export async function analyzeResults(): Promise<void> {
  currGame.wrongAnswer.forEach((i) => {
    console.log(i.page);
  });

  const wrongArr = await Promise.all(
    currGame.wrongAnswer.map((i) => {
      return getUserWord(i.id);
    }),
  );

  const userId = store.getState().user.userId as string;

  wrongArr.forEach(async (res) => {
    if (res.status === 200) {
      if (res.payload) {
        if (res.payload.difficulty === 'learned') {
          await updateUserWord(userId, res.payload.wordId, 'notset');
        }
      }
    }
  });
}
