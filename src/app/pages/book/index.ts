import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { BookParam, HashPath, IWord } from '../../types';
import { getWords } from '../../api/get-words';
import { store } from '../../redux/store';
import { createUserWord } from '../../api/create-user-word';
import { getUserWord, UserWord } from '../../api/get-user-word';
import { updateUserWord } from '../../api/update-user-word';
import { registerEnableStarListener } from './registerEnableStarListener';
import { registerEnableTickListener } from './registerEnableTickListener';
import { pageContent } from '../book/page-content';

export function createBookMain(rootElement: HTMLDivElement) {
  const bookHeader = document.createElement('h1');
  bookHeader.className = 'book-header';
  bookHeader.innerText = 'Учебник RSLang';

  const bookContent = document.createElement('div');
  bookContent.className = 'book-content';

  const bookSections = document.createElement('div');
  bookSections.className = 'sections';
  bookSections.innerHTML = `
    <ol>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=0&${BookParam.Page}=0">Раздел 1</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=1&${BookParam.Page}=0">Раздел 2</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=2&${BookParam.Page}=0">Раздел 3</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=3&${BookParam.Page}=0">Раздел 4</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=4&${BookParam.Page}=0">Раздел 5</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=5&${BookParam.Page}=0">Раздел 6</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=6&${BookParam.Page}=0">Сложные слова</a></li>
    </ol>
    `;
  const descriptionBook = document.createElement('div');
  descriptionBook.className = 'description-book';
  descriptionBook.innerHTML = `  
    <div class="rules">
    <p class="icon"><i class="fas fa-info-circle"></i></p>
    <p class="meaning"> Учебник содержит 3600 часто употребляемых английских слов.    
    Слова в коллекции отсортированы от более простых и известных к более сложным. 
    Вся коллекция разбита на шесть разделов, в каждом разделе 30 страниц, на каждой странице 20 слов для изучения.    
    Выберите раздел и успехов в изучении!</p>
    </div>  
    <br>
    <hr>
    <br> 
    <div class="rules"> 
    <p class="difficult"><i class="far fa-star"></i></p>  
    <p class="meaning">Сложные слова можно отменить звёздочкой. Эти слова будут находиться в разделе <em>Сложные</em>.</p>
    </div>
    <br> 
    <div class="rules">
    <p class="learned"><i class="far fa-check-circle"></i></p>   
    <p class="meaning">Изученные слова можно отметить птичкой.Изученные разделы будут отмечены птичкой.</p>
    </div>
    <br> 
    <div class="rules"> 
    <p class="extention"><i class="fas fa-info-circle"></i></p>  
    <p class="meaning extention">Данные функции доступны только для авторизированных пользователей.</p>
    </div>
    <br>
    <hr>
    <br> 
    <div class="rules">  
    <p class="icon"><i class="fas fa-gamepad"></i></p> 
    <p class="meaning">Мини-игры запускаются из меню, в ней можно выбрать один из шести уровней сложности, которые отличаются тем, слова какого из шести раздлов коллекции исходных данных в ней задействованы
    если мини-игра запускается со страницы учебника, в ней используются слова из той страницы учебника, на которой размещена ссылка на игру. 
    Если размещённых на странице слов для игры недостаточно, задействуются слова с предыдущих страниц. Если предыдущих страниц нет или недостаточно, игра завершается досрочно, когда закончатся все доступные слова
    Игры в изученых разделах - недоступны.</p>
    </div>
    `;
  bookContent.appendChild(bookSections);
  bookContent.appendChild(descriptionBook);
  rootElement.appendChild(bookHeader);
  rootElement.appendChild(bookContent);
  return rootElement;
}

export async function createDifficultWord(word: IWord, status: string) {
  if (store.getState().user.userId === null) {
    return Promise.reject('err');
  } else {
    const userId = store.getState().user.userId!;
    const wordStatus = await getUserWord(userId, word.id);

    if (wordStatus === UserWord.Notfound) {
      createUserWord(userId, word.id, status);
    } else {
      updateUserWord(userId, word.id, status);
    }
  }
}
export function registerDisableStarListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordStateChange: () => void,
) {
  difficultBtn.onclick = () => {
    createDifficultWord(word, UserWord.Notset).then(() => {
      difficultBtn.style.color = '#455d7a';
      learnedBtn.style.color = '#455d7a';
      indicatorContainer.style.backgroundColor = '#ffff';
      onWordStateChange();
      registerEnableStarListener(
        difficultBtn,
        word,
        learnedBtn,
        indicatorContainer,
        onWordStateChange,
      );
      registerEnableTickListener(
        difficultBtn,
        word,
        learnedBtn,
        indicatorContainer,
        onWordStateChange,
      );
    });
  };
}

export function registerDisableTickListener(
  difficultBtn: HTMLElement,
  word: IWord,
  learnedBtn: HTMLElement,
  indicatorContainer: HTMLDivElement,
  onWordStateChange: () => void,
) {
  learnedBtn.onclick = () => {
    createDifficultWord(word, UserWord.Notset).then(() => {
      difficultBtn.style.color = '#455d7a';
      learnedBtn.style.color = '#455d7a';
      indicatorContainer.style.backgroundColor = '#ffff';
      onWordStateChange();
      registerEnableTickListener(
        difficultBtn,
        word,
        learnedBtn,
        indicatorContainer,
        onWordStateChange,
      );
      registerEnableStarListener(
        difficultBtn,
        word,
        learnedBtn,
        indicatorContainer,
        onWordStateChange,
      );
    });
  };
}

async function enrichWords(words: IWord[]) {
  const enrichedWordsPromise: Promise<[IWord, UserWord]>[] = words.map((word) =>
    getUserWord(store.getState().user.userId!, word.id).then(
      (userWord: UserWord) => [word, userWord],
      () => [word, UserWord.Notset],
    ),
  );

  const enrichedWords = await Promise.all(enrichedWordsPromise);
  return enrichedWords;
}

export function createWordElement(
  word: IWord,
  onWordStateChange: () => void,
  userWord?: UserWord,
): HTMLDivElement {
  const wordCard = document.createElement('div');
  wordCard.className = 'word-card';
  const indicatorContainer = document.createElement('div');
  indicatorContainer.className = 'indicator';

  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';
  const userChoose = document.createElement('div');
  userChoose.className = 'user-choose';
  userChoose.innerHTML = `
  <p class="user-difficult"><i class="far fa-star icon-choose"></i></p>
  <p class="user-learned" ><i class="far fa-check-circle icon-choose"></i></p>
  `;
  const wordImg = document.createElement('img');
  wordImg.className = 'word-img';
  wordImg.src = `https://rs-school-learnwords.herokuapp.com/${word.image}`;

  imageContainer.appendChild(userChoose);
  imageContainer.appendChild(wordImg);

  function wordSound() {
    const audio = new Audio();
    audio.src = `https://rs-school-learnwords.herokuapp.com/${word.audio}`;
    audio.play();
  }

  const someWord = document.createElement('div');
  someWord.className = 'some-word';
  someWord.innerHTML = `
  <p><b>${word.word}</b> - ${word.wordTranslate}</p>
  <hr>
  <br>  
  <p><i class="far fa-play-circle word-sound"></i> / ${word.transcription} /</p>
  <p class="specification">Использование:</p>
  <ul class="meaning">
  <li>${word.textMeaning}</li>
  <li>${word.textMeaningTranslate}</li>
  </ul>
  <p class="specification">Пример:</p>
  <ul class="meaning">
  <li>${word.textExample}</li>
  <li>${word.textExampleTranslate}</li>
  </ul>
  `;
  const sound = someWord.querySelector('.word-sound') as HTMLButtonElement;
  sound.addEventListener('click', wordSound);

  const difficultBtn = userChoose.querySelector('.user-difficult') as HTMLElement;
  const learnedBtn = userChoose.querySelector('.user-learned') as HTMLElement;
  if (userWord === UserWord.Difficult) {
    difficultBtn.style.color = '#f95959';
    indicatorContainer.style.backgroundColor = '#ffd0d0';
    registerDisableStarListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
    registerEnableTickListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
  } else if (userWord === UserWord.Learned) {
    learnedBtn.style.color = '#17b86b';
    indicatorContainer.style.backgroundColor = '#89f5c1';
    registerDisableTickListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
    registerEnableStarListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
  } else {
    registerEnableStarListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
    registerEnableTickListener(
      difficultBtn,
      word,
      learnedBtn,
      indicatorContainer,
      onWordStateChange,
    );
  }

  wordCard.appendChild(indicatorContainer);
  wordCard.appendChild(imageContainer);
  wordCard.appendChild(someWord);

  return wordCard;
}

function createLearnedHeader(rootElement: HTMLDivElement) {
  const containerText = document.createElement('div');
  containerText.className = 'learned-page';
  containerText.innerHTML = `
  <p class="text-learned"><i class="far fa-check-circle"></i>Страница выучена!</p>
  `;
  rootElement.innerHTML = '';
  rootElement.appendChild(containerText);
}

function isLearnedWords(enrichedWords: [IWord, UserWord][]) {
  return enrichedWords.every(
    ([, userWord]) => userWord === UserWord.Learned || userWord === UserWord.Difficult,
  );
}

export async function createBookGroup(group: number, page: number, rootElement: HTMLDivElement) {
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  const wordsContainer = document.createElement('div');
  wordsContainer.className = 'words-container';

  const words = await getWords(group, page);
  if (store.getState().user.userId !== null) {
    const enrichedWords = await enrichWords(words);

    const onWordStateChange = async () => {
      if (isLearnedWords(enrichedWords)) {
        const messageBlock = document.querySelector('.empty') as HTMLDivElement;
        createLearnedHeader(messageBlock);
        pageContent({ group, page });
      } else {
        const messageBlock = document.querySelector('.empty') as HTMLDivElement;
        messageBlock.innerHTML = '';
        pageContent({ group, page });
      }
    };
    onWordStateChange();
    enrichedWords.forEach(([word, userWord]) => {
      let wordElement = createWordElement(word, onWordStateChange, userWord);
      wordsContainer.appendChild(wordElement);
    });

  } else {
    words.forEach((word) => {
      let wordElement = createWordElement(word, () => {});
      wordsContainer.appendChild(wordElement);
    });
  }

  mainContent.appendChild(wordsContainer);
  rootElement.appendChild(mainContent);
}

export function createNavigation(group: number, page: number, rootElement: HTMLDivElement) {
  const navigationBlock = document.createElement('div');
  navigationBlock.className = 'navigation-block';

  navigationBlock.innerHTML = `
  <p class="pagination-icon"><i class="far fa-arrow-alt-circle-up" id="back-sections"></i></p>
  <p class="page-info">Раздел ${group + 1} / Страница ${page + 1}</p>
  <div>
  <p class="pagination-icon"><i class="far fa-arrow-alt-circle-left" id="previous-page"></i></p>
  <p class="pagination-icon"><i class="far fa-arrow-alt-circle-right" id="next-page"></i></p>
  </div>
  <div class="games-menu">
  <p class="pagination-icon"><i class="fas fa-gamepad icon dropdown-btn"></i></p>
  <div class="dropdown-content">
  <a href="${HashPath.audioCallPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}">Аудио-вызов</a>
  <a href="${HashPath.sprintPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}">Спринт</a>
  </div>
  </div>
  
  <div class="empty"></div>
  `;

  const backMainBook = navigationBlock.querySelector('#back-sections') as HTMLDivElement;
  backMainBook.addEventListener('click', () => (location.href = `${HashPath.bookPage}`));

  const nextBtn = navigationBlock.querySelector('#next-page') as HTMLButtonElement;
  nextBtn.addEventListener('click', () => {
    location.href = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=${
      page + 1
    }`;
  });

  const prevBtn = navigationBlock.querySelector('#previous-page') as HTMLButtonElement;
  prevBtn.addEventListener('click', () => {
    if (page <= 1) {
      location.href = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=1`;
    } else {
      location.href = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=${
        page - 1
      }`;
    }
  });

  rootElement.appendChild(navigationBlock);
}



export const getBookPage: TPageComponent = (params) => {
  const bookLocation = params.group !== -1 ? ` р ${params.group + 1} / стр ${params.page + 1}` : '';
  const pageTitle = 'RSLang - Учебник' + bookLocation;
  updatePage(pageTitle, pageContent(params));
};
