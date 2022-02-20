import { updatePage } from '../../components/page';
import { TPageComponent } from '../../router';
import photoKon from '../../../assets/photo/1.jpg';
import photoWer from '../../../assets/photo/2.jpg';
import photoVen from '../../../assets/photo/3.jpg';

interface ITeamMate {
  name: string;
  img: string;
  colorClass: string;
  github: string;
  text: string;
}

const teamData: ITeamMate[] = [
  {
    name: 'Константин Гончаров',
    img: photoKon,
    colorClass: 'person__box_y',
    github: 'https://github.com/khoncharov',
    text: `<b>Вклад в проект:</b> разработка конфигурации проекта, разработка роутинга сайта, разработка
      игры "Аудио вызов", разработка макета и базовых стилей сайта, разработка страниц главная и о команде`,
  },
  {
    name: 'Вероника Федорец',
    img: photoWer,
    colorClass: 'person__box_g',
    github: 'https://github.com/WeronikaFed',
    text: `<b>Вклад в проект:</b> разработка электронного учебника, разработка списка слов, разработка
      авторизации, настройка базы данных и создание копии бэкэнда`,
  },
  {
    name: 'Вениамин',
    img: photoVen,
    colorClass: 'person__box_n',
    github: 'https://github.com/v3n9s',
    text: '<b>Вклад в проект:</b> разработка игры Спринт',
  },
];

function personCard(data: ITeamMate): string {
  return `
    <div class="person__card">
      <h2 class="person__name">
        <a class="person__link" href="${data.github}"><i class="fab fa-github"></i></a>
        ${data.name}
      </h2>
      <div class="person__photo-container">
        <img class="person__photo" width="196" src="${data.img}">
      </div>
      <div class="person__box ${data.colorClass}"></div>
      <p class="person__description">${data.text}<p>
    </div>`;
}

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';

  let personsList = '';
  teamData.forEach((member) => {
    personsList += personCard(member);
  });

  node.innerHTML = `
    <section class="home">
      <div class="home__header-container">
        <h2 class="home__caption">Наша команда</h2>
      </div>
      <div class="about__content-container">
        ${personsList}
      </div>
    </section>`;

  return node;
};

export const getAboutTeamPage: TPageComponent = () => {
  const pageTitle = 'RSLang - О команде';
  updatePage(pageTitle, pageContent());
};
