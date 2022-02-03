import { store } from '../store';
import myCar from '../assets/city-car.svg';
import { updateSomething } from '../store-slices/some-slice';

export const component = {
  createBackgroundExample(): HTMLDivElement {
    const div = document.createElement('div');
    div.classList.add('background-example');
    return div;
  },

  createImgExample(): HTMLImageElement {
    const img = document.createElement('img') as HTMLImageElement;
    img.src = myCar;
    img.alt = 'My awesome car';
    return img;
  },

  createInput(): HTMLDivElement {
    const div = document.createElement('div');

    const input = document.createElement('input');
    input.type = 'text';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.textContent = 'Add to store';

    btn.addEventListener('click', () => {
      store.dispatch(updateSomething(input.value));
    });

    div.append(input, btn);
    return div;
  },
};
