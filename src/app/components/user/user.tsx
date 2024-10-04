// "use client"

import { use } from 'react';
import { getUser } from './actions';

export default function User() {
  const user = use(getUser());
  return (
    // <>{user ? (
    //   <pre>{JSON.stringify(user, null, 2)}</pre>

    // ) : (
    //   <span>aqui...</span>
    // )}</>
    <pre>{JSON.stringify(user, null, 2)}</pre>
  );
}
