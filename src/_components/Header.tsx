'use client';

import { boardSelectedAtom } from '@/_atoms/board-selected.atom';
import { filtersAtom } from '@/_atoms/filters-atom';
import { IUser, usersAtom } from '@/_atoms/users-atoms';
import { Cube } from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import InputWithSearch from './InputWithSearch';
import Logo from './Logo';
import { Option } from './Select';
import SelectUser from './SelectUser';

export default function Header() {
  const router = useRouter();
  const users = useAtomValue(usersAtom);
  const [boardSelected, setBoardSelected] = useAtom(boardSelectedAtom);
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
    setBoardSelected(null);
  };

  return (
    <header className="bg-white py-2 px-5 grid grid-cols-[1.5fr_3fr] h-16">
      <div className="flex justify-between items-center">
        <Logo />
        {boardSelected && (
          <div className="flex gap-2 items-center">
            <h2 className="font-bold text-lg">{boardSelected.title}</h2>
            <div className="w-[1px] bg-gray-500 h-8"></div>
            <Button
              label="All board"
              icon={<Cube size={20} />}
              variant="text"
              onClick={redirectAllBoards}
            />
          </div>
        )}
      </div>
      <div className="flex gap-3 justify-end">
        <InputWithSearch
          name="filters"
          placeholder="keywords"
          onSearch={(value) => setFilters({ search: value })}
        />
        {!boardSelected && (
          <div className="w-56">
            <SelectUser onClick={handleSelectUser} />
          </div>
        )}
      </div>
    </header>
  );
}
