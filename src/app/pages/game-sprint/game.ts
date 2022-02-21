import { store } from '../../redux/store';
import { IWord } from '../../types';
import { getAggregatedWords } from '../../api/get-aggregated-words';
import { getDifficultWords } from '../../api/user-difficult-words';
import { getWords } from '../../api/get-words';
import { HashPath } from '../../types';

import { startView, loadingView, gameView, resultsView } from './layout';

interface ILevel {
  word: string;
  translation: string;
  isRight: boolean;
  isUserRight?: boolean;
}

enum GameEndReason {
  TimeExceeded = 'TimeExceeded',
  LackOfWords = 'LackOfWords',
  ViewChange = 'ViewChange',
}

const ROUND_TIME = 60;

const POINTS_PER_LEVEL = 10;

let gameContainer: HTMLDivElement;

let words: IWord[] = [];

let isCurrentWordRight: boolean;

let levels: ILevel[] = [];

let rightAnswersStreak = 0;

let score = 0;

let intervalId: NodeJS.Timer;

function endGameOnViewChange() {
  endGame(GameEndReason.ViewChange);
}

function clearGame() {
  levels = [];
  rightAnswersStreak = 0;
  score = 0;
  if (intervalId) clearInterval(intervalId);
  window.removeEventListener('hashchange', endGameOnViewChange);
  document.removeEventListener('keydown', handleKeyDown);
}

function handleResultsClick(e: MouseEvent) {
  const target = (<HTMLElement>e.target).closest<HTMLElement>('[data-action]');
  if (!target) return;
  if (target.dataset.action === 'play-again') {
    prepareGame({ group: 0, page: 0 });
  }
  if (target.dataset.action === 'to-book') {
    window.location.hash = HashPath.bookPage;
  }
}

function showResults() {
  gameContainer.innerHTML = resultsView;
  gameContainer.querySelector('.game-sprint__results-list')!.innerHTML = levels.map((level) => {
    return `
    <li class="game-sprint-level game-sprint-level_${level.isUserRight ? 'right' : 'wrong'}">
      <div class="game-sprint-level__item">${level.word}</div>
      <div class="game-sprint-level__item">${level.translation}</div>
      <div class="game-sprint-level__item">${level.isRight ? 'Верно' : 'Не верно'}</div>
    </li>`;
  }).join('');
  gameContainer.querySelector('.game-sprint__results-controls')!.addEventListener('click', (e) => handleResultsClick(<MouseEvent>e));
  gameContainer.querySelector('.game-sprint__score-value')!.textContent = `${score}`;
}

function endGame(reason: GameEndReason) {
  if ([GameEndReason.LackOfWords, GameEndReason.TimeExceeded].includes(reason)) showResults();
  clearGame();
}

function renderLevel({ word, translation }: { word: string, translation: string }) {
  document.querySelector('.game-sprint__text_word')!.textContent = word;
  document.querySelector('.game-sprint__text_translation')!.textContent = translation;
}

function generateLevel(): ILevel | null {
  if (words.length === 0) {
    return null;
  } else if (words.length === 1) {
    const word = words[0].word;
    const translation = words[0].wordTranslate;
    words = [];
    return { word, translation, isRight: true };
  }
  const randomWordInd = Math.floor(Math.random() * words.length);
  const randomWordTranslationInd = Math.random() > 0.5 ? randomWordInd : Math.floor(Math.random() * words.length);
  const randomWord = words[randomWordInd];
  const randomWordTranslation = words[randomWordTranslationInd];
  words = words.filter((word, ind) => ind !== randomWordInd && ind !== randomWordTranslationInd);
  return {
    word: randomWord.word,
    translation: randomWordTranslation.wordTranslate,
    isRight: randomWordInd === randomWordTranslationInd,
  };
}

function renderScore() {
  document.querySelector('.game-sprint-score')!.textContent = `${score}`;
}

function getScoreMultiplier(streak: number) {
  const multiplier = 2 ** Math.floor(streak / 3);
  return multiplier <= 8 ? multiplier : 8;
}

function nextLevel() {
  const level = generateLevel();
  if (level === null) endGame(GameEndReason.LackOfWords);
  else {
    levels.push(level);
    renderLevel(level);
    renderScore();
    isCurrentWordRight = level.isRight;
  }
}

function onWrongAnswer() {
  rightAnswersStreak = 0;
}

function onRightAnswer() {
  score += getScoreMultiplier(rightAnswersStreak) * POINTS_PER_LEVEL;
  rightAnswersStreak += 1;
}

function onAnswer(isRight: boolean) {
  if (isRight) onRightAnswer();
  else onWrongAnswer();
  levels[levels.length - 1].isUserRight = isRight;
  nextLevel();
}

function handleLevelClick(e: MouseEvent) {
  const target = (<HTMLElement>e.target).closest<HTMLElement>('[data-action]');
  if (!target) return;
  if (target.dataset.action === 'wrong') {
    if (!isCurrentWordRight) onAnswer(true);
    else onAnswer(false);
  } else if (target.dataset.action === 'right') {
    if (isCurrentWordRight) onAnswer(true);
    else onAnswer(false);
  }
}

function startTimer() {
  let timer = ROUND_TIME;
  const realText = document.querySelector('.game-sprint-time__item_real')!;
  const overlayText = document.querySelector<HTMLElement>('.game-sprint-time__item_overlay')!;
  overlayText.style.transitionDuration = `${ROUND_TIME}s`;
  setTimeout(() => {
    overlayText.classList.add('game-sprint-time__item_overlay_hidden');
  }, 10);
  const iteration = () => {
    realText.textContent = `${timer}`;
    overlayText.textContent = `${timer}`;
    if (timer === 0) {
      clearInterval(intervalId);
      endGame(GameEndReason.TimeExceeded);
    }
    timer -= 1;
  };
  iteration();
  intervalId = setInterval(() => iteration(), 1000);
}

function handleKeyDown(e: KeyboardEvent) {
  const button = e.code;
  if (button === 'ArrowLeft') {
    if (!isCurrentWordRight) onAnswer(true);
    else onAnswer(false);
  } else if (button === 'ArrowRight') {
    if (isCurrentWordRight) onAnswer(true);
    else onAnswer(false);
  }
}

async function startGame({ group, page }:{ group: number, page: number }) {
  gameContainer.innerHTML = loadingView;
  const { userId } = store.getState().user;
  if (userId) {
    if (group === 6) {
      words = await getDifficultWords(userId);
    } else {
      words = (await getAggregatedWords({ userId, group, wordsPerPage: 4000 })).words.filter((word) => word.page <= page);
    }
    if (words.length <= 3) {
      words = (await getAggregatedWords({ userId, group: 0, wordsPerPage: 4000 })).words.filter((word) => word.page <= page);
    }
  } else {
    words = await getWords(group, page);
  }
  gameContainer.innerHTML = gameView;
  nextLevel();
  gameContainer.querySelector('.game-sprint__controls')?.addEventListener('click', (e) => handleLevelClick(<MouseEvent>e));
  startTimer();

  window.addEventListener('hashchange', endGameOnViewChange, { once: true });
  document.addEventListener('keydown', handleKeyDown);
}

export function prepareGame({ group, page }:{ group: number, page: number }) {
  if (group === -1) group = 0;
  if (page === -1) page = 0;
  gameContainer = document.querySelector<HTMLDivElement>('.game-sprint__container')!;
  gameContainer.innerHTML = startView;
  const startGameButton = gameContainer.querySelector<HTMLButtonElement>('.game-sprint-ctrls__start')!;
  startGameButton.addEventListener('click', () => {
    startGame({ group, page });
  });

  const difficultySelect = gameContainer.querySelector<HTMLSelectElement>('.game-sprint-ctrls__difficulty')!;

  if (group !== -1) {
    difficultySelect.value = `${group}`;
  }
  difficultySelect.addEventListener('change', () => {
    group = +difficultySelect.value;
  });
}
