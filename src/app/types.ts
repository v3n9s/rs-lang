export enum HashPath {
  homePage = '#/home',
  bookPage = '#/book',
  audioCallPage = '#/audio-call',
  sprintPage = '#/sprint',
  statsPage = '#/stats',
  aboutTeamPage = '#/about-team',
}

export enum BookParam {
  Group = 'group',
  Page = 'page',
}

export interface IBookNav {
  group: number;
  page: number;
}
