import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import { HashPath } from '../../types';

const pageContent = (params: string): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  node.innerHTML = `
    <br>
    <br>
    <h1>Учебник</h1>
    <h3>Раздел ${params}</h3>
    <ol>
      <li><a href="${HashPath.bookPage + '?cat=1'}">Раздел 1</a></li>
      <li><a href="${HashPath.bookPage + '?cat=2'}">Раздел 2</a></li>
      <li><a href="${HashPath.bookPage + '?cat=3'}">Раздел 3</a></li>
      <li><a href="${HashPath.bookPage + '?cat=4'}">Раздел 4</a></li>
      <li><a href="${HashPath.bookPage + '?cat=5'}">Раздел 5</a></li>
    </ol>
    <br>
    <br>`;

  return node;
};

export const getBookPage: TPageComponent = (params) => {
  const pageTitle = 'RSLang - Учебник';
  updatePage(pageTitle, pageContent(params));
};
