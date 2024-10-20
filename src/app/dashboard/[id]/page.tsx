'use client';

import Header from '@/_components/Header';
import { useAtomValue } from 'jotai';

export default function Dashboard({ params }: { params: { id: string } }) {
  return <h1>{params.id}</h1>;
}
