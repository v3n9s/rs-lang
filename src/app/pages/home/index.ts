import { TPageComponent } from '../../router';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const getHomePage: TPageComponent = () => {
  document.title = 'RSLang - Главная';

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
    <h1>Об учебнике</h1>
    <p>Учебник клёвый. Потому что.</p>
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
    footerContainer.innerHTML = footer.render();
    appContainer.append(footerContainer);
  }
};