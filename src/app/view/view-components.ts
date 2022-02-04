export const header = {
  render: (): string => {
    return `
      <section>
        <h1>Навигация</h1>
      </section>`;
  },
};

export const footer = {
  render: (): string => {
    return `
      <section>
        <h1>Футер</h1>
      </section>`;
  },
};

export const aboutBookSection = {
  render: (): string => {
    return `
      <section>
        <h1>Об учебнике</h1>
        <p>Учебник клёвый. Потому что.</p>
      </section>`;
  },
};

export const bookSection = {
  render: (): string => {
    return `
      <section>
        <h1>Учебник</h1>
        <p>Разделы</p>
      </section>`;
  },
};

export const statsSection = {
  render: (): string => {
    return `
      <section>
        <h1>Статистика</h1>
        <p>123 ...</p>
      </section>`;
  },
};

export const aboutTeamSection = {
  render: (): string => {
    return `
      <section>
        <h1>О команде</h1>
        <p>1й 2й 3й</p>
      </section>`;
  },
};
