import { currGame } from '.';
import { DB_ORIGIN } from '../../const';
import { store } from '../../redux/store';
import { WORDS_IN_ROUND } from './const';
import { getIdNum, shuffle } from './utils';
import { createGameResultView } from './game-result';
import { addACGameKeyboardAction } from './keyboad-control';

function createOptionBtns(container: HTMLDivElement): void {
  const btnIndices = [0, 1, 2, 3, 4];
  let btnsList = '';
  btnIndices.forEach((index) => {
    btnsList += `
      <div class="game-play__answer-item">
        <div class="answer-icon-container icon_fail hidden-item" id="option-icon-${index}">
          <i class="fa-regular fa-circle-xmark"></i>
        </div>
        <button class="answer-btn" type="button" id="option-btn-${index}"></button>
      </div>`;
  });

  container.innerHTML = btnsList;
}

export function setupGameRound(): void {
  addACGameKeyboardAction(false);

  const gameData = store.getState().audiocallData;
  console.log('round set for >', currGame.round); // -----------------------------------

  const nextRoundBtn = document.querySelector('#next-round-btn') as HTMLButtonElement;
  nextRoundBtn.disabled = true;

  const wordImg = document.querySelector('.game-play__img') as HTMLImageElement;
  (wordImg.parentElement as HTMLDivElement).classList.add('hidden-item');
  wordImg.src = `${DB_ORIGIN}/${gameData[currGame.round * WORDS_IN_ROUND].image}`;

  const wordSound = document.querySelector('#word-audio') as HTMLAudioElement;
  wordSound.src = `${DB_ORIGIN}/${gameData[currGame.round * WORDS_IN_ROUND].audio}`;
  wordSound.autoplay = true;

  const word = document.querySelector('.game-play__answer-word') as HTMLDivElement;
  word.classList.add('hidden-item');
  const answerData = gameData[currGame.round * WORDS_IN_ROUND];
  word.innerHTML = answerData.word;

  const optionsList = gameData.slice(
    currGame.round * WORDS_IN_ROUND,
    currGame.round * WORDS_IN_ROUND + WORDS_IN_ROUND,
  );
  shuffle(optionsList);
  const answerIndex = optionsList.indexOf(answerData);

  const optionBtnsContainer = document.querySelector(
    '.game-play__answer-options',
  ) as HTMLDivElement;
  createOptionBtns(optionBtnsContainer);

  const answerIconContainer = document.querySelector(
    `#option-icon-${answerIndex}`,
  ) as HTMLDivElement;
  answerIconContainer.classList.remove('icon_fail');
  answerIconContainer.classList.add('icon_success');
  answerIconContainer.innerHTML = '<i class="fa-regular fa-circle-check"></i>';

  const optionBtns = optionBtnsContainer.querySelectorAll(
    'button[id^=option-btn]',
  ) as NodeListOf<HTMLButtonElement>;

  optionBtns.forEach((btn, index) => {
    btn.classList.remove('answer-btn_chosen');
    btn.disabled = false;
    btn.textContent = optionsList[index].wordTranslate;

    btn.addEventListener('click', () => {
      btn.classList.add('answer-btn_chosen');
      (btn.previousElementSibling as HTMLDivElement).classList.remove('hidden-item');
      nextRoundBtn.disabled = false;

      optionBtns.forEach((button) => {
        button.disabled = true;
      });

      (wordImg.parentElement as HTMLDivElement).classList.remove('hidden-item');
      word.classList.remove('hidden-item');
      answerIconContainer.classList.remove('hidden-item');

      if (getIdNum(btn.id) === answerIndex) {
        currGame.rightAnswer.push(answerData);
      } else {
        currGame.wrongAnswer.push(answerData);
      }
    });
  });

  addACGameKeyboardAction(true);
}

export function createGamePlayView(): void {
  const gamePlayContainer = document.querySelector('.game-play__container') as HTMLDivElement;
  const node = document.createElement('div');
  node.className = 'game-play__inner-container';

  node.innerHTML = `
    <div class="game-play__question">
      <div class="game-play__img-container">
        <img class="game-play__img" width="120" height="120" src="#" alt="Картинка иллюстрирующая слово" />
      </div>
      <div class="game-play__play-btn" id="play-audio-btn">
        <i class="fa-regular fa-circle-play"></i>
        <audio id="word-audio" src="#"></audio>
      </div>
      <div class="game-play__answer-word"></div>
      <button class="default-btn" type="button" id="next-round-btn">дальше</button>
    </div>
    <div class="game-play__answer-options"></div>`;

  const playAudioBtn = node.querySelector('#play-audio-btn') as HTMLDivElement;
  const wordSound = node.querySelector('#word-audio') as HTMLAudioElement;

  playAudioBtn.addEventListener('click', () => {
    wordSound.play();
  });

  wordSound.addEventListener('play', () => {
    playAudioBtn.classList.add('game-play__play-btn_playing');
  });

  wordSound.addEventListener('ended', () => {
    playAudioBtn.classList.remove('game-play__play-btn_playing');
  });

  const nextRoundBtn = node.querySelector('#next-round-btn') as HTMLButtonElement;
  nextRoundBtn.addEventListener('click', () => {
    nextRoundBtn.disabled = true;
    currGame.nextRound();

    console.log(currGame); /// -----------------------------
    console.log('is over >', currGame.isOver()); /// -----------------------------

    if (currGame.isOver()) {
      addACGameKeyboardAction(false);
      createGameResultView();
    } else {
      setupGameRound();
    }
  });

  gamePlayContainer.append(node);
}
