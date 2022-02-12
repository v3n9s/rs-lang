import { getFooter } from './footer';
import { header } from './header';

export const updatePage = (pageTitle: string, pageContent: HTMLElement): void => {
  document.title = pageTitle;

  const appContainer = document.querySelector('#app') as HTMLDivElement;
  let headerContainer = document.querySelector('header');
  let mainContainer = document.querySelector('main');
  let footerContainer = document.querySelector('footer');

  if (!headerContainer) {
    headerContainer = document.createElement('header');
    headerContainer.className = 'header';
    headerContainer.innerHTML = header.render();
    appContainer.prepend(headerContainer);
  }

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.className = 'main';
    mainContainer.append(pageContent);
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = '';
    mainContainer.append(pageContent);
  }

  if (!footerContainer) {
    footerContainer = document.createElement('footer');
    footerContainer.className = 'footer';
    footerContainer.innerHTML = getFooter();
    appContainer.append(footerContainer);
  }
};
