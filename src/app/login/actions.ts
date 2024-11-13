import { usersMock } from '@/_mocks/boards';
import { toast } from 'react-toastify';

export function login(_: unknown, data: FormData) {
  const { username, password } = Object.fromEntries(data);
  const user = usersMock.find((user) => user.user === username);
  if (user?.user === username && user?.password === password) {
    toast.success('Login successfully!');
    return true;
  }
  toast.error('Incorrect username and/or password!');
  return false;
}
