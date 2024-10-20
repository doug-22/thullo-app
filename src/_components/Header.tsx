'use client';

import Logo from './Logo';
import Button from './Button';
import { Cube } from '@phosphor-icons/react';
import InputWithSearch from './InputWithSearch';
import SelectUser from './SelectUser';
import { IUser, usersAtom } from '@/_atoms/users-atoms';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useCallback } from 'react';
import { Option } from './Select';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { filtersAtom } from '@/_atoms/filters-atom';
import { useRouter } from 'next/navigation';

export default function Header() {
  const router = useRouter();
  const users = useAtomValue(usersAtom);
  const setFilters = useSetAtom(filtersAtom);
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: IUser) => setUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBoards'] });
      toast.success('User change made successfully!');
    },
  });

  const setUser = async (data: IUser) => {
    localStorage.setItem('user', JSON.stringify(data));
  };

  const handleSelectUser = useCallback(
    (value: Option) => {
      const findUser = users.find(
        (user) =>
          user.name.toLocaleLowerCase() === value.label.toLocaleLowerCase(),
      );
      mutate(findUser!);
    },
    [users],
  );

  const redirectAllBoards = () => {
    router.push('/dashboard');
  };

  return (
    <header className="bg-white py-2 px-5 grid grid-cols-[1.5fr_3fr] h-16">
      <div className="flex justify-between items-center">
        <Logo />
        <div className="flex gap-2 items-center">
          <h2 className="font-bold text-lg">Board Title</h2>
          <div className="w-[1px] bg-gray-500 h-8"></div>
          <Button
            label="All board"
            icon={<Cube size={20} />}
            variant="text"
            onClick={redirectAllBoards}
          />
        </div>
      </div>
      <div className="flex gap-3 justify-end">
        <InputWithSearch
          name="filters"
          placeholder="keywords"
          onSearch={(value) => setFilters({ search: value })}
        />
        <div className="w-56">
          <SelectUser onClick={handleSelectUser} />
        </div>
      </div>
    </header>
  );
}