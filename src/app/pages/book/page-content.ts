import { IBookNav } from '../../types';
import { createBookMain } from './index';
import { createNavigation } from './index';
import { createBookGroup } from './index';
import {
  createPageDifficultWord as createDifficultBookGroup,
  createHeaderPageDifficultWord as createDifficultNavigation,
} from '../book/create-page-difficult-word';

export const pageContent = (params: IBookNav): HTMLElement => {
  const node = document.createElement('div');
  node.className = 'main__container';
  const { group, page } = params;
  if (group === -1) {
    createBookMain(node);
  } else if (params.group <= 5) {
    createNavigation(group, page, node);
    createBookGroup(group, page, node);
  } else if (params.group === 6) {
    createDifficultNavigation(node);
    createDifficultBookGroup(6, node);
  }

  return node;
};
