import { IWord } from '../../types';
import { UserWord } from '../../api/get-user-word';
import { changeWordStatus, registerDisableTickListener } from './index';
import { registerEnableStarListener } from './registerEnableStarListener';

export function registerEnableTickListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordChange: () => void,
) {
  learnedBtn.onclick = async () => {
    difficultBtn.onclick = null;
    learnedBtn.onclick = null;
    await changeWordStatus(word, UserWord.Learned);
    await onWordChange();
    difficultBtn.style.color = '#455d7a';
    learnedBtn.style.color = '#17b86b';
    indicatorContainer.style.backgroundColor = '#89f5c1';
    registerDisableTickListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordChange);
    registerEnableStarListener(difficultBtn, word, learnedBtn, indicatorContainer, onWordChange);
  };
}
