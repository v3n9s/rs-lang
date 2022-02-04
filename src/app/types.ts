type TRender = (params: string) => string;

export interface IPageComponent {
  render: TRender;
}

export enum HashPath {
  homePage = '#/home',
  bookPage = '#/book',
  audioCallPage = '#/audio-call',
  sprintPage = '#/sprint',
  statsPage = '#/stats',
  aboutTeamPage = '#/about-team',
}
