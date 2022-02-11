import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  node.innerHTML = `
    <div class="not-found">
      <h2 class="not-found__caption">404</h2>
      <p class="not-found__text">Страница не найдена <i class="fa-regular fa-face-rolling-eyes"></i></p>
    </div>`;

  return node;
};

export const getNotFoundPage: TPageComponent = () => {
  const pageTitle = 'RSLang - Page not found';
  updatePage(pageTitle, pageContent());
};
