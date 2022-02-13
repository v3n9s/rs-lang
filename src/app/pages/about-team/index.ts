import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  node.innerHTML = `
    <br>
    <br>
    <h1>О команде</h1>
    <p>1, 2, 3.</p>
    <br>
    <br>`;

  return node;
};

export const getAboutTeamPage: TPageComponent = () => {
  const pageTitle = 'RSLang - О команде';
  updatePage(pageTitle, pageContent());
};
