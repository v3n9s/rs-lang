import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { BookParam, HashPath } from '../../types';

const pageContent = (params: string): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  node.innerHTML = `
    <br>
    <br>
    <h1>Учебник</h1>
    <h3>Раздел ${params}</h3>
    <ol>
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
          Раздел 100 - стр 0
        </a>
      </li>
      <li>
        <a href="${HashPath.bookPage}?${BookParam.Group}=0&${BookParam.Page}=100">
          Раздел 0 - стр 100
        </a>
      </li>
    </ol>
    <br>
    <br>`;

  return node;
};

export const getBookPage: TPageComponent = (params) => {
  const pageTitle = 'RSLang - Учебник';
  updatePage(pageTitle, pageContent(params));
};
