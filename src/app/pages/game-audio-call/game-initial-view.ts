import { currGame } from '.';
import { NOT_SET } from '../../const';
import { getGameData } from './game-data';
import { showLoader } from './utils';
import { createGamePlayView, setupGameRound } from './game-card';

export function createPickComplexityView(gameViewContainer: HTMLElement): void {
  const gamePlayContainer = gameViewContainer.querySelector(
    '.game-play__container',
  ) as HTMLDivElement;

  const node = document.createElement('div');
  node.className = 'game__complexity';

  node.innerHTML = `
    <button class="default-btn game__group-btn" type="button">Раздел 1</button>
    <button class="default-btn game__group-btn" type="button">Раздел 2</button>
    <button class="default-btn game__group-btn" type="button">Раздел 3</button>
    <button class="default-btn game__group-btn" type="button">Раздел 4</button>
    <button class="default-btn game__group-btn" type="button">Раздел 5</button>
    <button class="default-btn game__group-btn" type="button">Раздел 6</button>`;

  const btns = node.querySelectorAll('.game__group-btn') as NodeListOf<HTMLButtonElement>;
  btns.forEach((btn, index) => {
    btn.addEventListener('click', async () => {
      showLoader(true);
      await getGameData({ group: index, page: NOT_SET });
      node.remove();
      currGame.resetRounds();
      currGame.launchType = 'MENU';
      createGamePlayView();
      setupGameRound();
      showLoader(false);
    });
  });

  gamePlayContainer.append(node);
}
