import { currGame } from '.';
import { getUserWord } from './request';

export async function analyzeResults(): Promise<void> {
  Promise.all(
    currGame.wrongAnswer.map((i) => {
      return getUserWord(i.id);
    }),
  );
  Promise.all(
    currGame.rightAnswer.map((i) => {
      return getUserWord(i.id);
    }),
  );
}
