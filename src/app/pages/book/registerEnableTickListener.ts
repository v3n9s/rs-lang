import { IWord } from '../../types';
import { UserWord } from '../../api/get-user-word';
import { createDifficultWord, registerDisableTickListener } from './index';
import { registerEnableStarListener } from './registerEnableStarListener';

export function registerEnableTickListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordStateChange: () => void,
) {
  learnedBtn.onclick = () => {
    createDifficultWord(word, UserWord.Learned).then(() => {
      difficultBtn.style.color = '#455d7a';
      learnedBtn.style.color = '#17b86b';
      indicatorContainer.style.backgroundColor = '#89f5c1';
      onWordStateChange();
      registerDisableTickListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordStateChange);
      registerEnableStarListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordStateChange);
    });
  };
}
