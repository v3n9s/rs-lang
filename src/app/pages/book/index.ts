import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { BookParam, HashPath, IBookNav } from '../../types';

const pageContent = (params: IBookNav): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  const { group, page } = params;
  console.log('parse >', group, page);

  if (group === -1) {
    // запускаем book
    console.log('Book loaded');
  } else {
    // запускаем book на group - page
    console.log('Book loaded on G:', group, ', P: ', page);
  }

  node.innerHTML = `
    <br>
    <br>
    <h1>Учебник</h1>
    <br>
    <h3>Раздел ${params.group} стр ${params.page}</h3>
    <br>
    <ol>
      <li>
        <a href="${HashPath.bookPage}">
          Учебник
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=1&${BookParam.Page}=1">
          Раздел 1 - стр 1
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=0&${BookParam.Page}=22">
          Раздел 0 - стр 22
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=4&${BookParam.Page}=0">
          Раздел 4 - стр 0
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=100&${BookParam.Page}=0">
          Раздел 100 - стр 0 - неверные параметры
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=0&${BookParam.Page}=100">
          Раздел 0 - стр 100 - неверные параметры
        </a>
      </li>
      <br>
      <li>
        <a href="${HashPath.audioCallPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}">
          Вызов игры Аудио вызов с параметрами
        </a>
      </li>
      <li>
        <a href="${HashPath.sprintPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}">
          Вызов игры Спринт с параметрами
        </a>
      </li>
      <br>
      <li>
        <a href="">
          Вызов игры Спринт с параметрами
        </a>
      </li>
    </ol>
    <br>
    <br>`;

  return node;
};

export const getBookPage: TPageComponent = (params) => {
  const bookLocation = params.group !== -1 ? ` р ${params.group + 1} / стр ${params.page + 1}` : '';
  const pageTitle = 'RSLang - Учебник' + bookLocation;
  updatePage(pageTitle, pageContent(params));
};
