import { atom } from 'jotai';

export interface IUser {
  name: string;
  user: string;
  password: string;
  photo?: string;
}

export const usersAtom = atom<IUser[]>([
  {
    name: 'Douglas Oliveira',
    user: 'doug_oliv',
    password: 'douglas',
  },
  {
    name: 'Paulo Monteiro',
    user: 'paulo_mont',
    password: 'paulo',
  },
]);
