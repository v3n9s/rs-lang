export const startView = `
<div class="game-sprint-ctrls game-sprint__start-controls">
  <button class="game-sprint-button game-sprint-ctrls__start">Начать игру</button>
  <select class="game-sprint-ctrls__difficulty">
    <option value="0">1 Раздел</option>
    <option value="1">2 Раздел</option>
    <option value="2">3 Раздел</option>
    <option value="3">4 Раздел</option>
    <option value="4">5 Раздел</option>
    <option value="5">6 Раздел</option>
    <option value="6">Сложные слова</option>
  </select>
</div>`;

export const loadingView = `
<div class="game-sprint__loading">Загрузка...</div>`;

export const gameView = `
<div class="game-sprint-info">
  <div class="game-sprint-time game-sprint__time">
    <div class="game-sprint-time__item game-sprint-time__item_real"></div>
    <div class="game-sprint-time__item game-sprint-time__item_overlay"></div>
  </div>
  <div class="game-sprint-score"></div>
</div>
<div class="game-sprint__text game-sprint__text_word"></div>
<div class="game-sprint__text game-sprint__text_translation"></div>
<div class="game-sprint__controls">
  <button class="game-sprint-button game-sprint-button_wrong" data-action="wrong">Неверно</button>
  <button class="game-sprint-button" data-action="right">Верно</button>
</div>`;

export const resultsView = `
<div class="game-sprint__score">Очки: <span class="game-sprint__score-value"></span></div>
<div class="game-sprint-level game-sprint-level_header">
  <div class="game-sprint-level__item">Слово</div>
  <div class="game-sprint-level__item">Перевод</div>
  <div class="game-sprint-level__item">Правильный ответ</div>
</div>
<div class="game-sprint__results">
  <ul class="game-sprint__results-list"></ul>
</div>
<div class="game-sprint__results-controls">
  <button class="game-sprint-button" data-action="play-again">Играть ещё</button>
</div>`;
