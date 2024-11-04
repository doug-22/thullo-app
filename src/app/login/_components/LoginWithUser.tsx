'use client';

import { usersAtom } from '@/_atoms/users-atoms';
import Button from '@/_components/Button';
import Select, { Option } from '@/_components/Select';
import { useAtomValue } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginWithUser() {
  const router = useRouter();
  const users = useAtomValue(usersAtom);

  const [userSelected, setUserSelected] = useState<Option | null>(null);

  const usersOptions = useMemo(() => {
    return users.map((user) => {
      return {
        value: user.user,
        label: user.name,
      };
    });
  }, [users]);

  const handleSelectUser = (value: Option) => {
    setUserSelected(value);
  };

  const login = useCallback(() => {
    const user = users?.find((user) => user.user === userSelected?.value);
    localStorage.setItem('user', JSON.stringify(user));
    toast.success('Login successfully!');
    router.push('/dashboard');
  }, [userSelected]);

  return (
    <>
      <Select
        label="User"
        placeholder="Select user"
        onClick={handleSelectUser}
        options={usersOptions}
      />
      <Button label="Sign" onClick={login} />
    </>
  );
}
