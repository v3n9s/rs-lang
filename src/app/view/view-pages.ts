import { HashPath, IPageComponent } from '../types';

export const homePage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Главная';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>Об учебнике</h1>
        <p>Учебник клёвый. Потому что.</p>
      </section>`;
  },
};

export const bookPage: IPageComponent = {
  render: (params) => {
    document.title = 'RSLang - Учебник';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>Учебник</h1>
        <h3>Раздел ${params}</h3>
        <ol>
          <li><a href="${HashPath.bookPage + '?cat=1'}">Раздел 1</a></li>
          <li><a href="${HashPath.bookPage + '?cat=2'}">Раздел 2</a></li>
          <li><a href="${HashPath.bookPage + '?cat=3'}">Раздел 3</a></li>
          <li><a href="${HashPath.bookPage + '?cat=4'}">Раздел 4</a></li>
          <li><a href="${HashPath.bookPage + '?cat=5'}">Раздел 5</a></li>
        </ol>
      </section>`;
  },
};

export const audioCallPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Аудио вызов';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>Аудио вызов</h1>
        <p>Ау!</p>
      </section>`;
  },
};

export const sprintPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Спринт';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>Спринт</h1>
        <p>Играем!</p>
      </section>`;
  },
};

export const statsPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - Статистика';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>Статистика</h1>
        <p>123 ...</p>
      </section>`;
  },
};

export const aboutTeamPage: IPageComponent = {
  render: () => {
    document.title = 'RSLang - О команде';
    return `
      <section>
        <a href="${HashPath.homePage}">home</a>
        <a href="${HashPath.bookPage}">book</a>
        <a href="${HashPath.audioCallPage}">game1</a>
        <a href="${HashPath.sprintPage}">game2</a>
        <a href="${HashPath.statsPage}">stats</a>
        <a href="${HashPath.aboutTeamPage}">about team</a>
        <br />
        <h1>О команде</h1>
        <p>1, 2, 3.</p>
      </section>`;
  },
};
