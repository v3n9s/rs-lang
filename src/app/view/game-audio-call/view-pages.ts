import { IPageComponent } from '../../types';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const audioCallPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Аудио вызов';
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
        <h1>Аудио вызов</h1>
        <p>Ау!</p>
        <br>
        <br>`;

    node.append(headerContainer, mainContainer, footerContainer);
  },
};
