import { TPageComponent } from '../../router';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const getStatsPage: TPageComponent = () => {
  document.title = 'RSLang - Статистика';
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
    <h1>Статистика</h1>
    <p>123 ...</p>
    <br>
    <br>`;

  node.append(headerContainer, mainContainer, footerContainer);
};
