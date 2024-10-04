'use client';

import { usersAtom } from '@/atoms/users-atoms';
import Button from '@/components/Button';
import Input from '@/components/Input';
import Logo from '@/components/Logo';
import Select, { Option } from '@/components/Select';
import { useAtomValue } from 'jotai';
import { useMemo, useState } from 'react';

export default function Login() {
  const [loginView, setLoginView] = useState(true);
  const [userSelected, setUserSelected] = useState<Option | null>(null);
  const users = useAtomValue(usersAtom);

  const handleSelectView = () => {
    setLoginView(!loginView);
  };

  const handleSelectUser = (value: Option) => {
    setUserSelected(value);
  };

  const usersOptions = useMemo(() => {
    return users.map((user) => {
      return {
        value: user.user,
        label: user.name,
      };
    });
  }, [users]);

  return (
    <main className="h-screen flex">
      <div className="bg-white rounded-xl shadow-md m-auto min-w-96 max-w-md flex flex-col items-center gap-4 p-4">
        <Logo />
        {loginView && (
          <>
            <Input name="user" placeholder="Username" />
            <Input name="password" placeholder="Password" type="password" />
          </>
        )}
        {!loginView && (
          <Select
            placeholder="Select user"
            value={userSelected}
            onClick={handleSelectUser}
            options={usersOptions}
          />
        )}
        <Button label="Sign" onClick={() => console.log('user')} />
        <Button
          label={loginView ? 'login with user' : 'back'}
          type="text"
          onClick={handleSelectView}
        />
      </div>
    </main>
  );
}
