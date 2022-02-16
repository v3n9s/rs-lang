import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { BookParam, HashPath, IBookNav, IWord } from '../../types';
import { getWords } from '../../api/get-words';
import { WORD_PER_PAGE } from '../../const';

function createBookMain(rootElement: HTMLDivElement) {
  const bookHeader = document.createElement('h1');
  bookHeader.className = 'book-header';
  bookHeader.innerText = 'Учебник RSLang';

  const bookContent = document.createElement('div');
  bookContent.className = 'book-content';

  const bookSections = document.createElement('div');
  bookSections.className = 'sections';
  bookSections.innerHTML = `
    <ol>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=1&${BookParam.Page}=1">Раздел 1</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=2&${BookParam.Page}=1">Раздел 2</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=3&${BookParam.Page}=1">Раздел 3</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=4&${BookParam.Page}=1">Раздел 4</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=5&${BookParam.Page}=1">Раздел 5</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=6&${BookParam.Page}=1">Раздел 6</a></li>
      <li><a href="${HashPath.bookPage}?${BookParam.Group}=7&${BookParam.Page}=1" style="pointer-events: none;">Сложные слова</a></li>
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

function createWordElement(word: IWord): HTMLDivElement {
  const wordCard = document.createElement('div');
  wordCard.className = 'word-card';
  const imageContainer = document.createElement('div');
  imageContainer.className = 'image-container';
  const userChoose = document.createElement('div');
  userChoose.className = 'user-choose';
  userChoose.innerHTML = `
  <p class="user-difficult"><i class="far fa-star icon-choose"></i></p>
  <p class="user-learned"><i class="far fa-check-circle icon-choose"></i></p>
  `;
  const wordImg = document.createElement('img');
  wordImg.className = 'word-img';
  wordImg.src = `https://rs-school-learnwords.herokuapp.com/${word.image}`;

  imageContainer.appendChild(userChoose);
  imageContainer.appendChild(wordImg);

  function wordSound() {
    const audio = new Audio();
    audio.src = `https://rs-school-learnwords.herokuapp.com/${word.audio}`;
    audio.autoplay = true;
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
  const sound = someWord.querySelector('.word-sound');
  sound!.addEventListener('click', wordSound);

  wordCard.appendChild(imageContainer);
  wordCard.appendChild(someWord);

  return wordCard;
}

async function createBookGroup(group: number, page: number, rootElement: HTMLDivElement) {
  const mainContent = document.createElement('div');
  mainContent.className = 'main-content';

  const words = await getWords(group - 1, page - 1);

  const wordsContainer = document.createElement('div');
  wordsContainer.className = 'words-container';

  for (let i = 0; i <= WORD_PER_PAGE; i += 1) {
    let word = createWordElement(words[i]);
    wordsContainer.appendChild(word);
  }

  mainContent.appendChild(wordsContainer);
  rootElement.appendChild(mainContent);
}

function createNavigation(group: number, page: number, rootElement: HTMLDivElement) {
  const navigationBlock = document.createElement('div');
  navigationBlock.className = 'navigation-block';

  navigationBlock.innerHTML = `
  <p class="pagination-icon"><i class="far fa-arrow-alt-circle-up" id="back-sections"></i></p>
  <p class="page-info">Раздел ${group} / Страница ${page}</p>
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

  const backMainBook = navigationBlock.querySelector('#back-sections');
  backMainBook!.addEventListener('click', () => (location.href = `${HashPath.bookPage}`));

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

const pageContent = (params: IBookNav): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  const { group, page } = params;
  console.log('parse >', group, page);

  if (group === -1) {
    // запускаем book
    createBookMain(node);
    console.log('Book loaded');
  } else {
    createNavigation(group, page, node);
    createBookGroup(group, page, node);
    console.log('Book loaded on G:', group, ', P: ', page);
  }

  return node;
};

export const getBookPage: TPageComponent = (params) => {
  const bookLocation = params.group !== -1 ? ` р ${params.group + 1} / стр ${params.page + 1}` : '';
  const pageTitle = 'RSLang - Учебник' + bookLocation;
  updatePage(pageTitle, pageContent(params));
};


