import { TPageComponent } from '../../router';
import { updatePage } from '../../components/page';
import { store } from '../../redux/store';

function unauthContent(): string {
  return `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Статистика пользователя</h2>
      </div>
      <div class="stats__content-container">
        <div class="stats__not-auth">
          <p class="stats__text">Для накопления и просмотра статистики необходимо
          авторизоваться <i class="fa-regular fa-face-rolling-eyes"></i></p>
        </div>
      </div>
    </section>`;
}

function authContent(): string {
  const userName = store.getState().user.name;
  return `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Статистика пользователя <b>${userName}</b></h2>
      </div>
      <div class="stats__content-container">
        <div class="">
          <h3>Статистика на сегодня <i>В РАЗРАБОТКЕ</i></h3>
        </div>
      </div>
    </section>`;
}

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  const userName = store.getState().user.name ?? '';

  if (userName) {
    node.innerHTML = authContent();
  } else {
    node.innerHTML = unauthContent();
  }

  return node;
};

export const getStatsPage: TPageComponent = () => {
  const pageTitle = 'RSLang - Статистика';
  updatePage(pageTitle, pageContent());
};
