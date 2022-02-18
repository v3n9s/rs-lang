import { TPageComponent } from '../../router';
import { createGameNode } from './game-container';
import { IWordData } from './types';
import { store } from '../../redux/store';
import { WORDS_IN_ROUND } from './const';

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
  questionsMaxNumber: number;
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
    this.questionsMaxNumber = Math.floor(store.getState().audiocallData.length / WORDS_IN_ROUND);
  },
  nextRound() {
    this.round += 1;
  },
  questionsMaxNumber: 0,
  isOver() {
    return this.round === this.questionsMaxNumber;
  },
};
