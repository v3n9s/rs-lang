import { TPageComponent } from '../../router';
import { HashPath } from '../../types';
import { getFooter } from '../components/footer';
import { header } from '../components/header';

export const getBookPage: TPageComponent = (params) => {
  document.title = 'RSLang - Учебник';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  let headerContainer = document.querySelector('header');
  let mainContainer = document.querySelector('main');
  let footerContainer = document.querySelector('footer');

  if (!headerContainer) {
    headerContainer = document.createElement('header');
    headerContainer.innerHTML = header.render();
    appContainer.prepend(headerContainer);
  }

  const mainContent = `
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

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.innerHTML = mainContent;
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = mainContent;
  }

  if (!footerContainer) {
    footerContainer = document.createElement('footer');
    footerContainer.innerHTML = getFooter();
    appContainer.append(footerContainer);
  }
};
