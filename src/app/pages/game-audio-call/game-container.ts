import { NOT_SET, SITE_ORIGIN } from '../../const';
import { IBookNav } from '../../types';
import { BookParam, HashPath } from '../../types';
import { showLoader } from './utils';
import { createPickComplexityView } from './game-initial-view';
import { createGamePlayView } from './game-card';

function createGameViewContainer(book: IBookNav): HTMLElement {
  const node = document.createElement('div');
  node.className = 'game__inner-container';
  node.innerHTML = `
    <div class="game__controls">
      <button class="default-btn" id="audiocall-back-btn" type="button">закрыть</button>
      <h2 class="game__caption">Аудио вызов</h2>
      <div class="audio-call-info">
        <i class="fas fa-info-circle"></i>
        <div class="game__info-container">
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Impedit consequuntur
          perferendis quae quibusdam temporibus placeat molestias voluptatum, eum officia
          commodi. Officia omnis voluptates explicabo voluptas provident ad sed deleniti
          dolor!
        </div>
      </div>
    </div>
    <div class="game-play__container"></div>`;

  const backBtn = node.querySelector('#audiocall-back-btn') as HTMLButtonElement;
  backBtn.addEventListener('click', () => {
    const gameContainer = document.querySelector('.game') as HTMLElement;
    gameContainer.remove();

    const loc = new URL(SITE_ORIGIN);

    if (book.group === NOT_SET) {
      loc.hash = HashPath.bookPage;
    } else {
      loc.hash = `${HashPath.bookPage}?${BookParam.Group}=${book.group}&${BookParam.Page}=${book.page}`;
    }
    location.assign(loc);
  });

  return node;
}

export function createGameNode(book: IBookNav): HTMLElement {
  const gameViewContainer = createGameViewContainer(book);

  if (book.group === NOT_SET) {
    createPickComplexityView(gameViewContainer);
  } else {
    setTimeout(() => {
      showLoader(true);
      // getGameData(); // game data will be placed in store
      showLoader(false);
      createGamePlayView();
    }, 0);
  }

  return gameViewContainer;
}
