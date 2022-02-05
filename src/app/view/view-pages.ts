import { HashPath, IPageComponent } from '../types';
import { footer, header } from './view-components';

export const homePage: IPageComponent = {
  render: () => {
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
  },
};

export const bookPage: IPageComponent = {
  render: (params) => {
    document.title = 'RSLang - Учебник';
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
        <h1>Учебник</h1>
        <h3>Раздел ${params}</h3>
        <ol>
          <li><a href="${HashPath.bookPage + '?cat=1'}">Раздел 1</a></li>
          <li><a href="${HashPath.bookPage + '?cat=2'}">Раздел 2</a></li>
          <li><a href="${HashPath.bookPage + '?cat=3'}">Раздел 3</a></li>
          <li><a href="${HashPath.bookPage + '?cat=4'}">Раздел 4</a></li>
          <li><a href="${HashPath.bookPage + '?cat=5'}">Раздел 5</a></li>
        </ol>
        <br>
        <br>`;

    node.append(headerContainer, mainContainer, footerContainer);
  },
};

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

export const statsPage: IPageComponent = {
  render: () => {
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
  },
};

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
