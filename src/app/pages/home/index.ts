import { decrCount, incrCount } from '../../redux/counter';
import { TPageComponent } from '../../router';
import { store } from '../../redux/store';
import { updatePage } from '../../components/page';

const incrBtnHandler = (element: HTMLElement): void => {
  store.dispatch(incrCount(1));
  let value = store.getState().counter.value;
  element.textContent = `Value: ${value}`;
};

const decrBtnHandler = (element: HTMLElement): void => {
  store.dispatch(decrCount(1));
  let value = store.getState().counter.value;
  element.textContent = `Value: ${value}`;
};

const pageContent = (): HTMLElement => {
  const node = document.createElement('div');
  node.classList.add('main__container');

  let count = store.getState().counter.value;

  node.innerHTML = `
    <br>
    <br>
    <h1>Об учебнике</h1>
    <p>Учебник клёвый. Потому что.</p>
    <br>
    <br>
    <h2 id="counter">Value: ${count}</h2> 
    <br>
    <button id="dec-btn" type="button">__dec__</button>
    <button id="inc-btn" type="button">__inc__</button>
    <br>
    <br>`;

  const incBtn = node.querySelector('#inc-btn') as HTMLButtonElement;
  const decBtn = node.querySelector('#dec-btn') as HTMLButtonElement;
  const counter = node.querySelector('#counter') as HTMLElement;

  incBtn.addEventListener('click', () => {
    incrBtnHandler(counter);
  });

  decBtn.addEventListener('click', () => {
    decrBtnHandler(counter);
  });

  return node;
};

export const getHomePage: TPageComponent = () => {
  const pageTitle = 'RSLang - Главная';
  updatePage(pageTitle, pageContent());
};
