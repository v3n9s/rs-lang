import { IPageComponent } from '../types';

export const homePage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - Главная';
    return `
      <section>
        <h1>Об учебнике</h1>
        <p>Учебник клёвый. Потому что.</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};

export const bookPage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - Учебник';
    return `
      <section>
        <h1>Учебник</h1>
        <p>Раздел 1 ...</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};

export const audioCallPage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - Аудио вызов';
    return `
      <section>
        <h1>Аудио вызов</h1>
        <p>Ау!</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};

export const sprintPage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - Спринт';
    return `
      <section>
        <h1>Спринт</h1>
        <p>Играем!</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};

export const statsPage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - Статистика';
    return `
      <section>
        <h1>Статистика</h1>
        <p>123 ...</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};

export const aboutTeamPage: IPageComponent = {
  render: (): string => {
    document.title = 'RSLang - О команде';
    return `
      <section>
        <h1>О команде</h1>
        <p>1, 2, 3.</p>
        <br />
        <a href="/">home</a>
        <a href="#/book">book</a>
        <a href="#/audio-call">game1</a>
        <a href="#/sprint">game2</a>
        <a href="#/stats">stats</a>
        <a href="#/about-team">about team</a>
      </section>`;
  },
};
