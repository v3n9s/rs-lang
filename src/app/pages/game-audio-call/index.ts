import { TPageComponent } from '../../router';
import { BookParam, HashPath } from '../../types';

export const getAudioCallPage: TPageComponent = (params) => {
  document.title = 'RSLang - Аудио вызов';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  const gameNode = document.createElement('section');
  gameNode.className = 'game';

  const { group, page } = params;
  console.log('parse >', group, page);

  if (group === -1) {
    // запускаем с выбора уровня сложности
    console.log('Выбор уровня сложности');
  } else {
    // запускаем с параметрами
    console.log('Игра запушена для G:', group, ', P: ', page);
  }

  gameNode.innerHTML = `
    <button
    class="default-btn"
      id="audiocall-back-btn"
      type=button
      >назад к Учебнику</button>
    <br>
    <br>
    <h2>Аудио вызов</h2>
    <h3>Group = ${group}</h3>
    <h3>Page = ${page}</h3>
    <p></p>`;

  const backButton = gameNode.querySelector('#audiocall-back-btn') as HTMLButtonElement;
  backButton.addEventListener('click', () => {
    gameNode.remove();

    const loc = new URL(location.toString());

    if (group === -1) {
      loc.hash = HashPath.bookPage;
    } else {
      loc.hash = `${HashPath.bookPage}?${BookParam.Group}=${group}&${BookParam.Page}=${page}`;
    }

    location.assign(loc);
  });

  appContainer.innerHTML = '';
  appContainer.append(gameNode);
};
