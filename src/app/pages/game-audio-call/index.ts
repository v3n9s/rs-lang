import { TPageComponent } from '../../router';
import { createGameNode } from './game-container';
import { QUESTIONS_MAX_NUMBER } from './const';
import { IWordData } from './types';

export const getAudioCallPage: TPageComponent = (params) => {
  document.title = 'RSLang - Аудио вызов';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const gameNode = document.createElement('section');
  gameNode.className = 'game';
  gameNode.append(createGameNode(params));

  appContainer.innerHTML = '';
  appContainer.append(gameNode);
};

interface IAudiocalGameSetting {
  round: number;
  rightAnswer: Array<IWordData>;
  wrongAnswer: Array<IWordData>;
  resetRounds: () => void;
  nextRound: () => void;
  isOver: () => boolean;
}

export const currGame: IAudiocalGameSetting = {
  round: 0,
  rightAnswer: [],
  wrongAnswer: [],
  resetRounds() {
    this.round = 0;
    this.rightAnswer.length = 0;
    this.wrongAnswer.length = 0;
  },
  nextRound() {
    this.round += 1;
  },
  isOver() {
    return this.round === QUESTIONS_MAX_NUMBER; // should be changeable number
  },
};
