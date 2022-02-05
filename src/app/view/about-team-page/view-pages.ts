import { IPageComponent } from '../../types';
import { footer } from '../components/footer';
import { header } from '../components/header';

export const aboutTeamPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - О команде';
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
      <h1>О команде</h1>
      <p>1, 2, 3.</p>
      <br>
      <br>`;

    node.append(headerContainer, mainContainer, footerContainer);
  },
};
