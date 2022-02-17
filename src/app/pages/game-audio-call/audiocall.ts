import { acGame } from '.';
import { DB_ORIGIN, NOT_SET, SITE_ORIGIN } from '../../const';
import { store } from '../../redux/store';
import { IBookNav } from '../../types';
import { BookParam, HashPath } from '../../types';
import { WORDS_IN_ROUND } from './const';
import { getGameData } from './request';
import { showLoader, shuffle } from './utils';

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

function updateGamePlayView(): void {
  const gameData = store.getState().audiocallData;

  const wordImg = document.querySelector('.game-play__img') as HTMLImageElement;
  wordImg.src = `${DB_ORIGIN}/${gameData[acGame.round * WORDS_IN_ROUND].image}`;

  const wordSound = document.querySelector('#word-audio') as HTMLAudioElement;
  wordSound.src = `${DB_ORIGIN}/${gameData[acGame.round * WORDS_IN_ROUND].audio}`;
  wordSound.autoplay = true;
  const playAudioBtn = document.querySelector('#play-audio-btn') as HTMLDivElement;
  wordSound.addEventListener('play', () => {
    playAudioBtn.classList.add('game-play__play-btn_playing');
  });
  wordSound.addEventListener('ended', () => {
    playAudioBtn.classList.remove('game-play__play-btn_playing');
  });

  const word = document.querySelector('.game-play__answer-word') as HTMLDivElement;
  word.innerHTML = gameData[acGame.round * WORDS_IN_ROUND].word;

  const optionsList = gameData.slice(
    acGame.round * WORDS_IN_ROUND,
    acGame.round * WORDS_IN_ROUND + WORDS_IN_ROUND,
  );
  shuffle(optionsList);

  const optionBtns = document.querySelectorAll('button[id^=option-btn]');
  optionBtns.forEach((btn, index) => {
    btn.textContent = optionsList[index].wordTranslate;
  });
}

function createGamePlayView(): void {
  const gamePlayContainer = document.querySelector('.game-play__container') as HTMLDivElement;
  const node = document.createElement('div');
  node.className = 'game-play__inner-container';

  node.innerHTML = `
    <div class="game-play__question">
      <div class="game-play__img-container hidden-item">
        <img class="game-play__img" width="120" height="120" src="#" alt="Картинка иллюстрирующая слово" />
      </div>
      <div class="game-play__play-btn" id="play-audio-btn">
        <i class="fa-regular fa-circle-play"></i>
        <audio id="word-audio" src="#"></audio>
      </div>
      <div class="game-play__answer-word hidden-item">...</div>
      <button class="default-btn" type="button">нет ответа</button>
    </div>
    <div class="game-play__answer">
      <div class="game-play__answer-item">
        <div class="answer-icon-container">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-0">...</button>
      </div>
      <div class="game-play__answer-item">
        <div class="answer-icon-container">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-1">...</button>
      </div>
      <div class="game-play__answer-item">
        <div class="answer-icon-container">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-2">...</button>
      </div>
      <div class="game-play__answer-item">
        <div class="answer-icon-container">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-3">...</button>
      </div>
      <div class="game-play__answer-item">
        <div class="answer-icon-container">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-4">...</button>
      </div>
    </div>`;

  const playAudioBtn = node.querySelector('#play-audio-btn') as HTMLDivElement;
  playAudioBtn.addEventListener('click', () => {
    const audioItem = node.querySelector('#word-audio') as HTMLAudioElement;
    audioItem.play();
  });

  gamePlayContainer.append(node);
}

function createPickComplexityView(gameViewContainer: HTMLElement): void {
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
      acGame.resetRounds();
      createGamePlayView();
      updateGamePlayView();
      showLoader(false);
    });
  });

  gamePlayContainer.append(node);
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
