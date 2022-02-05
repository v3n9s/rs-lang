import { HashPath } from '../types';

describe('Test "HashPath" enum type', () => {
  test("HashPath.homePage should be equal to '#/home'", () => {
    expect(HashPath.homePage).toBe('#/home');
  });

  test("HashPath.bookPage should be equal to '#/book'", () => {
    expect(HashPath.bookPage).toBe('#/book');
  });

  test("HashPath.audioCallPage should be equal to '#/audio-call'", () => {
    expect(HashPath.audioCallPage).toBe('#/audio-call');
  });

  test("HashPath.sprintPage should be equal to '#/sprint'", () => {
    expect(HashPath.sprintPage).toBe('#/sprint');
  });

  test("HashPath.statsPage should be equal to '#/stats'", () => {
    expect(HashPath.statsPage).toBe('#/stats');
  });

  test("HashPath.aboutTeamPage should be equal to '#/about-team'", () => {
    expect(HashPath.aboutTeamPage).toBe('#/about-team');
  });
});
