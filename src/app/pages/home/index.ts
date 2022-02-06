import { TPageComponent } from '../../router';
import { getFooter } from '../components/footer';
import { header } from '../components/header';

const createMain = (): HTMLElement => {
  const node = document.createElement('section');

  let count = 0;

  node.innerHTML = `
    <br>
    <br>
    <h1>Об учебнике</h1>
    <p>Учебник клёвый. Потому что.</p>
    <br>
    <br>
    <h2 id="counter">${count}</h2> 
    <br>
    <button id="dec-btn" type="button">__dec__</button>
    <button id="inc-btn" type="button">__inc__</button>
    <br>
    <br>`;

  const incBtn = node.querySelector('#inc-btn') as HTMLButtonElement;
  const decBtn = node.querySelector('#dec-btn') as HTMLButtonElement;
  const counter = node.querySelector('#counter') as HTMLElement;

  incBtn.addEventListener('click', () => {
    count += 1;
    counter.textContent = count.toString();
  });

  decBtn.addEventListener('click', () => {
    count -= 1;
    counter.textContent = count.toString();
  });

  return node;
};

export const getHomePage: TPageComponent = () => {
  document.title = 'RSLang - Главная';

  const appContainer = document.querySelector('#app') as HTMLDivElement;

  let headerContainer = document.querySelector('header');
  let mainContainer = document.querySelector('main');
  let footerContainer = document.querySelector('footer');

  if (!headerContainer) {
    headerContainer = document.createElement('header');
    headerContainer.innerHTML = header.render();
    appContainer.prepend(headerContainer);
  }

  if (!mainContainer) {
    mainContainer = document.createElement('main');
    mainContainer.append(createMain());
    appContainer.append(mainContainer);
  } else {
    mainContainer.innerHTML = '';
    mainContainer.append(createMain());
  }

  if (!footerContainer) {
    footerContainer = document.createElement('footer');
    footerContainer.innerHTML = getFooter();
    appContainer.append(footerContainer);
  }
};
