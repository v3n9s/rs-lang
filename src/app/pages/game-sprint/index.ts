import { TPageComponent } from '../../router';
import { BookParam, HashPath } from '../../types';
import { prepareGame } from './game';

export const getSprintPage: TPageComponent = (params) => {
  document.title = 'RSLang - Спринт';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const gameNode = document.createElement('section');
  gameNode.className = 'game';

  const { group, page } = params;

  gameNode.innerHTML = `
    <button
      class="game-sprint-button game-sprint-button_center"
      id="audiocall-back-btn"
      >К учебнику</button>
    <div class="game-sprint">
      <div class="game-sprint__container"></div>
    </div>`;

  const backButton = gameNode.querySelector('#audiocall-back-btn') as HTMLButtonElement;
  backButton.addEventListener('click', () => {
    gameNode.remove();

    const loc = new URL(location.toString());

    if (group === -1) {
      loc.hash = HashPath.bookPage;
    } else {
      loc.hash = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}`;
    }

    location.assign(loc);
  });

  appContainer.innerHTML = '';
  appContainer.append(gameNode);

  prepareGame({ group, page });
};
