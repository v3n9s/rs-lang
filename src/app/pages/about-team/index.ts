import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  node.innerHTML = `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Наша команда</h2>
      </div>
      <div class="about__content-container">
        123
        <br />
        123
        <br />
        123
        <br />
        123
      </div>
    </section>`;

  return node;
};

export const getAboutTeamPage: TPageComponent = () => {
  const pageTitle = 'RSLang - О команде';
  updatePage(pageTitle, pageContent());
};
