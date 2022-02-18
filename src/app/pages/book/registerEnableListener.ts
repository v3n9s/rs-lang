import { IWord } from '../../types';
import { UserWord } from '../../api/get-user-word';
import { createDifficultWord, registerDisableStarListener, registerDisableTickListener } from './index';

export function registerEnableStarListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
) {
  difficultBtn.onclick = () => {
    createDifficultWord(word, UserWord.Difficult).then(() => {
      difficultBtn.style.color = '#f95959';
      learnedBtn.style.color = '#455d7a';
      indicatorContainer.style.backgroundColor = '#ffd0d0';
      registerDisableStarListener(difficultBtn, word, learnedBtn, indicatorContainer);
      registerEnableTickListener(difficultBtn, word, learnedBtn, indicatorContainer);
    });
  };
}

export function registerEnableTickListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
) {
  learnedBtn.onclick = () => {
    createDifficultWord(word, UserWord.Learned).then(() => {
      difficultBtn.style.color = '#455d7a';
      learnedBtn.style.color = '#17b86b';
      indicatorContainer.style.backgroundColor = '#89f5c1';
      registerDisableTickListener(difficultBtn, word, learnedBtn, indicatorContainer);
      registerEnableStarListener(difficultBtn, word, learnedBtn, indicatorContainer);
    });
  };
}
