import { atom } from 'jotai';

interface IFilters {
  search: string;
}

export const filtersAtom = atom<IFilters>({
  search: '',
});
