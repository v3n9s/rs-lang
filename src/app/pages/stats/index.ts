import { TPageComponent } from '../../router';
import { updatePage } from '../../components/page';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  node.innerHTML = `
    <br>
    <br>
    <h1>Статистика</h1>
    <p>123 ...</p>
    <br>
    <br>`;

  return node;
};

export const getStatsPage: TPageComponent = () => {
  const pageTitle = 'RSLang - Статистика';
  updatePage(pageTitle, pageContent());
};
