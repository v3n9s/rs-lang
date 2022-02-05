import { TPageComponent } from '../../router';
import { HashPath } from '../../types';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const getBookPage: TPageComponent = (params) => {
  document.title = 'RSLang - Учебник';
  const node = document.querySelector('#app') as HTMLDivElement;
  node.innerHTML = '';

  const headerContainer = document.createElement('header');
  const mainContainer = document.createElement('main');
  const footerContainer = document.createElement('footer');

  headerContainer.innerHTML = header.render();
  footerContainer.innerHTML = footer.render();

  mainContainer.innerHTML = `
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

  node.append(headerContainer, mainContainer, footerContainer);
};
