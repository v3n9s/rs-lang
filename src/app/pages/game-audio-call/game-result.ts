import { currGame } from '.';
import { DB_ORIGIN } from '../../const';
import { createPickComplexityView } from './game-initial-view';
import { IWordData } from './types';

function createList(listClassName: string, listContent: IWordData[]): HTMLUListElement {
  const list = document.createElement('ul');
  list.className = listClassName;

  listContent.forEach((wordItem) => {
    const listItem = document.createElement('li');
    listItem.className = 'result__item';
    listItem.innerHTML = `
      <div class="game-play__play-btn result__play-btn">
        <i class="fa-regular fa-circle-play"></i>
        <audio src="${DB_ORIGIN}/${wordItem.audio}"></audio>
      </div>
      <span><strong>${wordItem.word}</strong> - ${wordItem.wordTranslate}</span>`;

    const playAudioBtn = listItem.querySelector('.result__play-btn') as HTMLDivElement;
    const wordSound = listItem.querySelector('audio') as HTMLAudioElement;

    playAudioBtn.addEventListener('click', () => {
      wordSound.play();
    });

    wordSound.addEventListener('play', () => {
      playAudioBtn.classList.add('game-play__play-btn_playing');
    });

    wordSound.addEventListener('ended', () => {
      playAudioBtn.classList.remove('game-play__play-btn_playing');
    });

    list.appendChild(listItem);
  });

  return list;
}

export function createGameResultView(): void {
  const gamePlayContainer = document.querySelector('.game-play__container') as HTMLDivElement;
  const node = gamePlayContainer.querySelector('.game-play__inner-container') as HTMLDivElement;

  node.innerHTML = `
    <div class="result__caption-container">
      <div class="result__caption">
        <div class="result__play-btn icon_fail">
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
        <span>не угаданно: <strong>${currGame.wrongAnswer.length}</strong></span>
      </div>
    </div>
    <div class="result__caption-container">
      <div class="result__caption">
        <div class="result__play-btn icon_success">
          <i class="fa-regular fa-circle-check"></i>
        </div>
        <span>угаданно: <strong>${currGame.rightAnswer.length}</strong></span>
      </div>
    </div>`;

  const nextGameBtn = document.createElement('button');
  nextGameBtn.type = 'button';
  nextGameBtn.className = 'default-btn next-game-btn';
  nextGameBtn.textContent = 'дальше';
  nextGameBtn.addEventListener('click', () => {
    const gameViewContainer = gamePlayContainer.parentElement as HTMLDivElement;
    gamePlayContainer.innerHTML = '';
    createPickComplexityView(gameViewContainer);
  });

  node.append(
    createList('game-play__wrong-items', currGame.wrongAnswer),
    createList('game-play__right-items', currGame.rightAnswer),
  );

  gamePlayContainer.append(node, nextGameBtn);
}
