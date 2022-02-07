import { TPageComponent } from '../../router';
import { header } from '../components/header';
import { getFooter } from '../components/footer';

export const getStatsPage: TPageComponent = () => {
  document.title = 'RSLang - Статистика';

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
    <h1>Статистика</h1>
    <p>123 ...</p>
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
