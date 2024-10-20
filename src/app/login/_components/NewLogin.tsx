'use client';

import { useActionState } from 'react';
import { login } from '../actions';
import Input from '@/_components/Input';
import Button from '@/_components/Button';

export default function NewLogin() {
  const [result, handleLogin, isPending] = useActionState(login, null);

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
