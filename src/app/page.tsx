// "use client"

import { Suspense } from 'react';
import User from './components/user/user';

export default function Home() {
  // const user = use(getUser())

  return (
    <div>
      <Suspense fallback={<p>Carregando...</p>}>
        <User />
      </Suspense>
    </div>
  );
}
