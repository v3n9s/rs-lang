import { NOT_SET, SITE_ORIGIN } from '../../const';
import { IBookNav } from '../../types';
import { BookParam, HashPath } from '../../types';
import { showLoader } from './utils';
import { createPickComplexityView } from './game-initial-view';
import { createGamePlayView, setupGameRound } from './game-card';
import { getGameData } from './game-data';
import { currGame } from '.';

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
          Для управления в игре используйте мышь или клавиатуру.
          <br />
          Управления с клавиатуры:
          <br />
          <b>z</b> - озвучить
          <br />
          <b>x</b> - следующее слово
          <br />
          <b>1</b>, <b>2</b>, <b>3</b>, <b>4</b>, <b>5</b> выбора ответа, где <b>1</b> - это
          верхний вариант ответа, а <b>5</b> - нижний.
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
    setTimeout(async () => {
      showLoader(true);
      await getGameData(book);
      currGame.resetRounds();
      createGamePlayView();
      setupGameRound();
      showLoader(false);
    }, 0);
  }

  return gameViewContainer;
}
