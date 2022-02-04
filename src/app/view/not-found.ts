import { IPageComponent } from '../types';

export const notFoundPage: IPageComponent = {
  render: (urlStr) => {
    return `
      <section>
        <h1>404 - Page not found</h1>
        <p>${urlStr}</p>
      </section>`;
  },
};
