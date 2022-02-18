export function showLoader(toShow: boolean): void {
  const loaderContainer = document.querySelector('.game-play__container') as HTMLDivElement;
  if (toShow) {
    const overlay = document.createElement('div');
    overlay.id = 'ac-loader-overlay';
    const loader = document.createElement('div');
    loader.className = 'login-loader';
    overlay.append(loader);
    loaderContainer.append(overlay);
  } else {
    const overlay = document.querySelector('#ac-loader-overlay') as HTMLDivElement;
    overlay.remove();
  }
}

export function shuffle<T>(arr: Array<T>): void {
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}

/**
 * Function returns array of randoms from 0 to maxValue including.
 */
export function getArrayOfRandomNumber(length: number, maxValue: number): Array<number> {
  const setOfRandoms: Set<number> = new Set();
  while (setOfRandoms.size < length) {
    setOfRandoms.add(Math.floor(Math.random() * maxValue + 1));
  }
  return Array.from(setOfRandoms);
}

export function getIdNum(value: string): number {
  return +value.split('-').slice(-1)[0];
}
