import { atom } from 'jotai';
import { ReactNode } from 'react';

export interface IModal {
  title: null | 'add board';
  content: ReactNode | null;
}

export const modalAtom = atom<IModal>({
  title: null,
  content: null,
});