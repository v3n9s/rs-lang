import { TPageComponent } from '../../router';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const getHomePage: TPageComponent = () => {
  document.title = 'RSLang - Главная';
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
    <h1>Об учебнике</h1>
    <p>Учебник клёвый. Потому что.</p>
    <br>
    <br>`;

  node.append(headerContainer, mainContainer, footerContainer);
};
