import { TPageComponent } from '../../router';

export const getNotFoundPage: TPageComponent = (params) => {
  document.title = 'RSLang - Page not found';
  const node = document.querySelector('#app') as HTMLDivElement;
  node.innerHTML = '';

  const mainContainer = document.createElement('main');

  mainContainer.innerHTML = `
      <br>
      <br>
      <h1>404 - page not found</h1>
      <p>Path: ${params}</p>
      <br>
      <br>`;

  node.append(mainContainer);
};
