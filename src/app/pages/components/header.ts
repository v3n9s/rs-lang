import { HashPath } from '../../types';

export const header = {
  render: (): string => {
    return `
      <a href="${HashPath.homePage}">| home |</a>
      <a href="${HashPath.bookPage}">| book |</a>
      <a href="${HashPath.audioCallPage}">| game1 |</a>
      <a href="${HashPath.sprintPage}">| game2 |</a>
      <a href="${HashPath.statsPage}">| stats |</a>
      <a href="${HashPath.aboutTeamPage}">| about team |</a>`;
  },
};
