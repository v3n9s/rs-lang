import { createWordElement } from '../book/index';
import { getDifficultWord } from '../../api/user-difficult-words';
import { store } from '../../redux/store';
import { UserWord } from '../../api/get-user-word';
import { HashPath } from '../../types';

export function createHeaderPageDifficultWord(rootElement: HTMLDivElement) {
  const navigationBlock = document.createElement('div');
  navigationBlock.className = 'navigation-block';

  navigationBlock.innerHTML = `
        <p class="pagination-icon"><i class="far fa-arrow-alt-circle-up" id="back-sections"></i></p>
        <p class="page-info">Сложные слова</p>
        <div class="empty"></div>
        `;

  const backMainBook = navigationBlock.querySelector('#back-sections') as HTMLDivElement;
  backMainBook.addEventListener('click', () => (location.href = `${HashPath.bookPage}`));
  rootElement.appendChild(navigationBlock);
}

export async function createPageDifficultWord(group: number, rootElement: HTMLDivElement) {
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  const wordsContainer = document.createElement('div');
  wordsContainer.className = 'words-container';

  const words = await getDifficultWord(store.getState().user.userId!);

  words.forEach((word) => {
    let wordElement = createWordElement(word, () => {}, UserWord.Difficult);
    wordsContainer.appendChild(wordElement);
  });

  mainContent.appendChild(wordsContainer);
  rootElement.appendChild(mainContent);
}
