import { TPageComponent } from '../../router';
import { updatePage } from '../../components/page';
import { store } from '../../redux/store';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  const userName = store.getState().user.name ?? '';

  node.innerHTML = `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Статистика пользователя <b>${userName}</b></h2>
      </div>
      <div class="stats__content-container">
        <div class="stats__not-auth">
          <p>Для просмотра и накопления статистики необходимо
          авторизоваться <i class="fa-regular fa-face-rolling-eyes"></i></p>
        </div>
      </div>
    </section>`;

  return node;
};

export const getStatsPage: TPageComponent = () => {
  const pageTitle = 'RSLang - Статистика';
  updatePage(pageTitle, pageContent());
};
