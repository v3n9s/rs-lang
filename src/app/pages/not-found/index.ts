import { TPageComponent } from '../../router';

export const getNotFoundPage: TPageComponent = (params) => {
  document.title = 'RSLang - Page not found';

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
    <br>
    <br>
    <h1>404 - page not found</h1>
    <p>Path: ${params}</p>
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
