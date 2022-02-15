import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { BookParam, HashPath, IBookNav } from '../../types';

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
      <li><a href="$${HashPath.bookPage}?${BookParam.Group}=7&${BookParam.Page}=1">Сложные слова</a></li>
    </ol>
    `;
  const descriptionBook = document.createElement('div');
  descriptionBook.className = 'description-book';
  descriptionBook.innerHTML = `  
    <div class="rules">
    <i class="fas fa-info-circle icon"></i>
    <p class="meaning"> Учебник содержит 3600 часто употребляемых английских слов.    
    Слова в коллекции отсортированы от более простых и известных к более сложным. 
    Вся коллекция разбита на шесть разделов, в каждом разделе 30 страниц, на каждой странице 20 слов для изучения.    
    Выберите раздел и успехов в изучении!</p>
    </div>  
    <br>
    <hr>
    <br> 
    <div class="rules"> 
    <i class="far fa-star icon"></i>  
    <p class="meaning">Сложные слова можно отменить звёздочкой. Эти слова будут находиться в разделе <em>Сложные</em>.</p>
    </div>
    <br> 
    <div class="rules">
    <i class="far fa-check-circle icon"></i>   
    <p class="meaning">Изученные слова можно отметить птичкой.Изученные разделы будут отмечены птичкой.</p>
    </div>
    <br> 
    <div class="rules"> 
    <i class="fas fa-info-circle extention icon"></i>  
    <p class="meaning extention">Данные функции доступны только для авторизированных пользователей.</p>
    </div>
    <br>
    <hr>
    <br> 
    <div class="rules">  
    <i class="fas fa-gamepad icon"></i> 
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

const pageContent = (params: IBookNav): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  const { group, page } = params;
  console.log('parse >', group, page);

  if (group === -1) {
    // запускаем book
    console.log('Book loaded');
  } else {
    // запускаем book на group - page
    console.log('Book loaded on G:', group, ', P: ', page);
  }
  createBookMain(node);
  return node;
};

export const getBookPage: TPageComponent = (params) => {
  const bookLocation = params.group !== -1 ? ` р ${params.group + 1} / стр ${params.page + 1}` : '';
  const pageTitle = 'RSLang - Учебник' + bookLocation;
  updatePage(pageTitle, pageContent(params));
};
