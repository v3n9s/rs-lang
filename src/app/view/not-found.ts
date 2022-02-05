import { IPageComponent } from '../types';

export const notFoundPage: IPageComponent = {
  render: (urlStr) => {
    document.title = 'RSLang - Page not found';
    const node = document.querySelector('#app') as HTMLDivElement;
    node.innerHTML = '';

    const mainContainer = document.createElement('main');

    mainContainer.innerHTML = `
      <br>
      <br>
      <h1>404 - page not found</h1>
      <p>Path: ${urlStr}</p>
      <br>
      <br>`;

    node.append(mainContainer);
  },
};
