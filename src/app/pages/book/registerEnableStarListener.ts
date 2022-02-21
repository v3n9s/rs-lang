import { IWord } from '../../types';
import { UserWord } from '../../api/get-user-word';
import { changeWordStatus, registerDisableStarListener } from './index';
import { registerEnableTickListener } from './registerEnableTickListener';

export function registerEnableStarListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordChange: () => void,
) {
  difficultBtn.onclick = async () => {
    difficultBtn.onclick = null;
    learnedBtn.onclick = null;
    await changeWordStatus(word, UserWord.Difficult);
    await onWordChange();
    difficultBtn.style.color = '#f95959';
    learnedBtn.style.color = '#455d7a';
    indicatorContainer.style.backgroundColor = '#ffd0d0';
    registerDisableStarListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordChange);
    registerEnableTickListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordChange);
  };
}
