import { IPageComponent } from '../../types';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const sprintPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Спринт';
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
        <h1>Спринт</h1>
        <p>Играем!</p>
        <br>
        <br>`;

    node.append(headerContainer, mainContainer, footerContainer);
  },
};
