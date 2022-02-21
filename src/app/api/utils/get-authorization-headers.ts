import { store } from '../../redux/store';

export function getAuthorizationHeaders(): Record<string, string> {
  return {
    authorization: `Bearer ${store.getState().user.token}`,
  };
}
