'use client';

import Button from '@/_components/Button';
import Logo from '@/_components/Logo';
import { useState } from 'react';
import NewLogin from './_components/NewLogin';
import LoginWithUser from './_components/LoginWithUser';

export default function Login() {
  const [loginView, setLoginView] = useState(true);

  const handleSelectView = () => {
    setLoginView(!loginView);
  };

  return (
    <main className="h-screen flex">
      <div className="bg-white rounded-xl shadow-md m-auto min-w-96 max-w-md flex flex-col items-center gap-4 p-4">
        <Logo />
        {loginView && <NewLogin />}
        {!loginView && <LoginWithUser />}
        <Button
          label={loginView ? 'login with user' : 'back'}
          variant="text"
          onClick={handleSelectView}
        />
      </div>
    </main>
  );
}
