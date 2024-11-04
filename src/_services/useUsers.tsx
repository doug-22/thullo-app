import { IUser } from '@/_atoms/users-atoms';
import { usersMock } from '@/_mocks/boards';
import getUserLogged from '@/_utils/getUserLogged';
import { useQuery } from '@tanstack/react-query';

export function getUsers(allUsers: boolean): IUser[] {
  const userLogged = getUserLogged();

  const users: IUser[] = usersMock;

  const usersFiltered = users?.filter((user) => {
    if (!(user.user === userLogged.user)) {
      return user;
    }
    return;
  });

  return allUsers ? users : usersFiltered;
}

export function useUsers({ allUsers = true }: { allUsers: boolean }) {
  const { data, ...rest } = useQuery({
    queryKey: ['getUsers', allUsers],
    queryFn: () => getUsers(allUsers),
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
