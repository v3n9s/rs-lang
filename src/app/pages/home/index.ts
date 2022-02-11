import { TPageComponent } from '../../router';
import { updatePage } from '../../components/page';
import rsLangLogo from '../../../assets/svg/rs-lang-logo.svg';

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  node.innerHTML = `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Приветствуем Вас на сайте RS Lang</h2>
      </div>
      <div class="home__content-container">
        <div class="home__background-img"></div>
        <h1 class="home__h1-caption">
          RS Lang - интерактивный учебник<br />для изучения английского языка
        </h1>
        <p class="home__description-text">
          Хотите путешествовать без языкового барьера, читать литературу, смотреть фильмы на
          языке оригинала, иметь возможность работать за рубежом и многое другое, тогда Вы на
          верном пути и RS Lang поможет Вам в изучении английского языка
        </p>
        <img
          class="home__rs-lang-logo"
          width="200"
          height="200"
          src="${rsLangLogo}"
          alt="RS-Lang logo"
        />
        <div class="home__list">
          <h3 class="home__list-caption">RS Lang это:</h3>
          <ul class="home__list-container">
            <li class="home__list-item">
              <i class="fa-regular fa-circle-check"></i>
              <span class="home__list-item-text">
                Более 3600 наиболее часто употребляемых слов
              </span>
            </li>
            <li class="home__list-item">
              <i class="fa-regular fa-circle-check"></i>
              <span class="home__list-item-text">
                Мини-игры для закрепления пройденного материала
              </span>
            </li>
            <li class="home__list-item">
              <i class="fa-regular fa-circle-check"></i>
              <span class="home__list-item-text">
                Возможность создавать словарь сложных слов
              </span>
            </li>
            <li class="home__list-item">
              <i class="fa-regular fa-circle-check"></i>
              <span class="home__list-item-text">
                Возможность отслеживать прогресс изучения слов
              </span>
            </li>
            <li class="home__list-item">
              <i class="fa-regular fa-circle-check"></i>
              <span class="home__list-item-text">Статистика процесса обучения</span>
            </li>
          </ul>
        </div>
      </div>
    </section>`;

  return node;
};

export const getHomePage: TPageComponent = () => {
  const pageTitle = 'RSLang - Главная';
  updatePage(pageTitle, pageContent());
};
