import { TPageComponent } from '../../router';

export const getAudioCallPage: TPageComponent = () => {
  document.title = 'RSLang - Аудио вызов';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  let headerContainer = document.querySelector('header');
  let mainContainer = document.querySelector('main');
  let footerContainer = document.querySelector('footer');

  if (headerContainer) {
    headerContainer.remove();
  }

  if (footerContainer) {
    footerContainer.remove();
  }

  const mainContent = `
    <button id="audiocall-back-btn" type=button>| \< back |</button>
    <br>
    <br>
    <h1>Аудио вызов</h1>
    <p>Ау!</p>
    <br>
    <br>`;

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.innerHTML = mainContent;
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = mainContent;
  }

  const backButton = mainContainer.querySelector('#audiocall-back-btn') as HTMLButtonElement;
  backButton.addEventListener('click', () => {
    history.back();
  });
};
