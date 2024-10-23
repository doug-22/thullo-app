import { atom } from 'jotai';
import { IUser } from './users-atoms';

export interface IBoard {
  id?: number;
  title: string;
  cover: string | null;
  public: boolean;
  members: IUser[];
}

export const boardSelectedAtom = atom<IBoard | null>(null);
