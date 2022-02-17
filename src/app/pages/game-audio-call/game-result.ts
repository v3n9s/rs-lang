import { currGame } from '.';
import { createPickComplexityView } from './game-initial-view';

// function answerRowItem():

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
    </div>
    <ul class="game-play__wrong-items">

      <li class="result__item">
        <div class="game-play__play-btn result__play-btn">
          <i class="fa-regular fa-circle-play"></i>
        </div>
        <span><strong>word</strong> - слово</span>
      </li>
      <li class="result__item">
        <div class="game-play__play-btn result__play-btn">
          <i class="fa-regular fa-circle-play"></i>
        </div>
        <span><strong>wordasdasda</strong> - словоылодваы</span>
      </li>
      <li class="result__item">
        <div class="game-play__play-btn result__play-btn">
          <i class="fa-regular fa-circle-play"></i>
        </div>
        <span><strong>word</strong> - слово</span>
      </li>

    </ul>
    <ul class="game-play__right-items">

      <li class="result__item">
        <div class="game-play__play-btn result__play-btn">
          <i class="fa-regular fa-circle-play"></i>
        </div>
        <span><strong>word</strong> - слово</span>
      </li>

    </ul>`;

  const nextGameBtn = document.createElement('button');
  nextGameBtn.type = 'button';
  nextGameBtn.className = 'default-btn next-game-btn';
  nextGameBtn.textContent = 'дальше';
  nextGameBtn.addEventListener('click', () => {
    const gameViewContainer = gamePlayContainer.parentElement as HTMLDivElement;
    gamePlayContainer.innerHTML = '';
    createPickComplexityView(gameViewContainer);
  });

  gamePlayContainer.append(node, nextGameBtn);
}
