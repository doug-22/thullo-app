'use client';

import Button from '@/_components/Button';
import Input from '@/_components/Input';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { login } from '../actions';

export default function NewLogin() {
  const router = useRouter();
  const [result, handleLogin] = useActionState(login, null);

  useEffect(() => {
    if (result) {
      router.push('/dashboard');
    }
  }, [result]);

  return (
    <form
      action={handleLogin}
      className="w-full flex flex-col gap-4 items-center"
    >
      <Input label="Username" name="username" placeholder="Username" />
      <Input
        label="Password"
        name="password"
        placeholder="Password"
        type="password"
      />
      <Button label="Sign" type="submit" />
    </form>
  );
}
