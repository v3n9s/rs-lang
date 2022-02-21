function keyboardActionHandler(e: KeyboardEvent): void {
  const playAudioBtn: HTMLElement | null = document.querySelector('#play-audio-btn');
  const nextRoundBtn: HTMLElement | null = document.querySelector('#next-round-btn');
  const optionBtn0: HTMLElement | null = document.querySelector('#option-btn-0');
  const optionBtn1: HTMLElement | null = document.querySelector('#option-btn-1');
  const optionBtn2: HTMLElement | null = document.querySelector('#option-btn-2');
  const optionBtn3: HTMLElement | null = document.querySelector('#option-btn-3');
  const optionBtn4: HTMLElement | null = document.querySelector('#option-btn-4');

  switch (e.code) {
    case 'KeyZ':
      if (playAudioBtn) {
        playAudioBtn.click();
      }
      break;
    case 'KeyX':
      if (nextRoundBtn) {
        nextRoundBtn.click();
      }
      break;
    case 'Digit1':
      if (optionBtn0) {
        optionBtn0.click();
      }
      break;
    case 'Digit2':
      if (optionBtn1) {
        optionBtn1.click();
      }
      break;
    case 'Digit3':
      if (optionBtn2) {
        optionBtn2.click();
      }
      break;
    case 'Digit4':
      if (optionBtn3) {
        optionBtn3.click();
      }
      break;
    case 'Digit5':
      if (optionBtn4) {
        optionBtn4.click();
      }
      break;
    default:
      break;
  }
}

export function addACGameKeyboardAction(toAdd: boolean): void {
  if (toAdd) {
    document.addEventListener('keyup', keyboardActionHandler);
  } else {
    document.removeEventListener('keyup', keyboardActionHandler);
  }
}
