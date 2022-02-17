import { TPageComponent } from '../../router';
import { createGameNode } from './audiocall';
import { QUESTIONS_MAX_NUMBER } from './const';

export const getAudioCallPage: TPageComponent = (params) => {
  document.title = 'RSLang - Аудио вызов';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const gameNode = document.createElement('section');
  gameNode.className = 'game';
  gameNode.append(createGameNode(params));

  appContainer.innerHTML = '';
  appContainer.append(gameNode);
};

export const acGame = {
  round: 0,
  resetRounds(): void {
    this.round = 0;
  },
  nextRound(): void {
    this.round += 1;
  },
  isOver(): boolean {
    return this.round === QUESTIONS_MAX_NUMBER;
  },
};
