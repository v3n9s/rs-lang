import { getHashPath, getSearchParams, hasSearchParams } from '../router';

describe('Test "hasSearchParams" function', () => {
  test("Str 'some-root' should be equal to 'false'", () => {
    expect(hasSearchParams('some-root')).toBe(false);
  });

  test("Str 'some-root#$!@$%* ._qwe' should be equal to 'false'", () => {
    expect(hasSearchParams('some-root#$!@$%* ._qwe')).toBe(false);
  });

  test("Str 'some-root?' should be equal to 'true'", () => {
    expect(hasSearchParams('some-root?')).toBe(true);
  });

  test("Str 'some-root?this-param???yes' should be equal to 'some-root'", () => {
    expect(hasSearchParams('some-root?this-param???yes')).toBe(true);
  });
});

describe('Test "getHashPath" function', () => {
  test("Str 'some-root' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root')).toBe('some-root');
  });

  test("Str 'some-root?' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root?')).toBe('some-root');
  });

  test("Str 'some-root?cat=1&qwert' should be equal to 'some-root'", () => {
    expect(getHashPath('some-root?cat=1&qwert')).toBe('some-root');
  });

  test("Str 'some?root?cat=1&qwert' should be equal to 'some'", () => {
    expect(getHashPath('some?root?cat=1&qwert')).toBe('some');
  });
});

describe('Test "getSearchParams" function', () => {
  test("Str 'some-root' should be equal to '' ", () => {
    expect(getSearchParams('some-root')).toBe('');
  });

  test("Str 'some-root?' should be equal to '?' ", () => {
    expect(getSearchParams('some-root?')).toBe('?');
  });

  test("Str 'some-root?cat=1&qwert' should be equal to '?cat=1&qwert'", () => {
    expect(getSearchParams('some-root?cat=1&qwert')).toBe('?cat=1&qwert');
  });

  test("Str 'some?root?cat=1&qwert' should be equal to '?root?cat=1&qwert'", () => {
    expect(getSearchParams('some?root?cat=1&qwert')).toBe('?root?cat=1&qwert');
  });

  test("Str 'some#.$%!=/root?cat=1&qwert' should be equal to '?cat=1&qwert'", () => {
    expect(getSearchParams('some#.$%!=/root?cat=1&qwert')).toBe('?cat=1&qwert');
  });
});

// describe('Test "getSearchParams" function', () => {
//   test("Str 'some-root' should be equal to '' ", () => {
//     expect(getSearchParams('some-root')).toBe('');
//   });
// });

// export function parseLocation(location: Location): ILocationParams {
//   const hash = location.hash.toLowerCase() || '/';
//   const hashPath = getHashPath(hash);
//   const searchParams = getSearchParams(hash);
//   return {
//     hashPath,
//     searchParams,
//   };
// }
// export function findComponentByPath(hashPath: string, routesArr: Array<IHashPathComponent>): IHashPathComponent | null {
//   if (hashPath === '/' || hashPath === '#/') {
//     return routes[0];
//   }
//   const component =
//     routesArr.find((item) => item.hashPath.match(new RegExp(`^\\${hashPath}$`, 'i'))) ?? null;
//   return component;
// }
