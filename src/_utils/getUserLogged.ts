'use client';
import { IUser } from '@/_atoms/users-atoms';

export default function getUserLogged(): IUser {
  return localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user') ?? '')
    : null;
}
