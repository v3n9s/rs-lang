import { component } from './compotent';

export const app = {
  init(): void {
    const appContainer = document.querySelector('#app') as HTMLElement;

    appContainer.innerHTML = '<h1>Hello RS-Lang</h1>';

    appContainer.append(
      component.createBackgroundExample(),
      component.createImgExample(),
      component.createInput(),
    );
  },
};
