import { HashPath } from '../types';
import rsLangLogo from '../../assets/svg/rs-lang-logo.svg';
import { authButtonHandler } from './authorization';

export const getHeaderNode = (): HTMLElement => {
  const headerContainer = document.createElement('div');
  headerContainer.className = 'header__container';
  headerContainer.innerHTML = `
      <div class="header__container">
        <div class="header__inner-container">
          <nav class="navigation">
            <a class="header__logo-link" href="#/">
              <img
                class="header__rs-lang-logo"
                width="60"
                height="60"
                src="${rsLangLogo}"
                alt="RS-Lang logo"
              />
            </a>
            <ul class="navigation__container">
              <li class="menu__item">
                <a class="menu__btn" href="${HashPath.homePage}">Главная</a>
              </li>
              <li class="menu__item">
                <a class="menu__btn" href="${HashPath.bookPage}">Учебник</a>
              </li>
              <li class="menu__item">
                <button class="menu__btn" id="games-list-btn" type="button">
                  Игры <i class="fa-solid fa-caret-down"></i>
                </button>
                <div class="games-list">
                  <a class="games-list__link" href="${HashPath.audioCallPage}">Аудио вызов</a>
                  <a class="games-list__link" href="${HashPath.sprintPage}">Спринт</a>
                </div>
              </li>
              <li class="menu__item">
                <a class="menu__btn" href="${HashPath.statsPage}">Статистика</a>
              </li>
              <li class="menu__item">
                <a class="menu__btn" href="${HashPath.aboutTeamPage}">О команде</a>
              </li>
            </ul>
          </nav>
          <button class="sign-in-btn" id="auth-btn" type="button">
            <i class="fa-solid fa-right-to-bracket"></i>
            <span class="sign-in-btn__caption">Вход</span>
          </button>
        </div>
      </div>`;
  authButtonHandler(headerContainer);
  return headerContainer;
};
