import { TPageComponent } from '../../router';
import { HashPath } from '../../types';

export const getSprintPage: TPageComponent = () => {
  document.title = 'RSLang - Спринт';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  let headerContainer = document.querySelector('header');
  let mainContainer = document.querySelector('main');
  let footerContainer = document.querySelector('footer');

  if (headerContainer) {
    headerContainer.remove();
  }

  if (footerContainer) {
    footerContainer.remove();
  }

  const mainContent = `
    <a href="${HashPath.homePage}">| home |</a>
    <br>
    <br>
    <h1>Спринт</h1>
    <p>Играем!</p>
    <br>
    <br>`;

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.innerHTML = mainContent;
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = mainContent;
  }
};
