import { IPageComponent } from '../types';

export const notFoundPage: IPageComponent = {
  render: (): string => {
    return `
      <section>
        <h1>404</h1>
        <p>Not found.</p>
      </section>`;
  },
};
