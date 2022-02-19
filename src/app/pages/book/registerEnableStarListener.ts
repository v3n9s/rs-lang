import { IWord } from '../../types';
import { UserWord } from '../../api/get-user-word';
import { createDifficultWord, registerDisableStarListener } from './index';
import { registerEnableTickListener } from './registerEnableTickListener';

export function registerEnableStarListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordStateChange: () => void,
) {
  difficultBtn.onclick = () => {
    createDifficultWord(word, UserWord.Difficult).then(() => {
      difficultBtn.style.color = '#f95959';
      learnedBtn.style.color = '#455d7a';
      indicatorContainer.style.backgroundColor = '#ffd0d0';
      onWordStateChange();
      registerDisableStarListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordStateChange);
      registerEnableTickListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordStateChange);
    });
  };
}


