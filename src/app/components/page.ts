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
    headerContainer.classList.add('header');
    headerContainer.appendChild(header.render());
    appContainer.prepend(headerContainer);
  }

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.classList.add('main');
    mainContainer.append(pageContent);
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = '';
    mainContainer.append(pageContent);
  }

  if (!footerContainer) {
    footerContainer = document.createElement('footer');
    footerContainer.classList.add('footer');
    footerContainer.innerHTML = getFooter();
    appContainer.append(footerContainer);
  }
};
