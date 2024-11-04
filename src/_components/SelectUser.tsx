import { usersAtom } from '@/_atoms/users-atoms';
import { CaretDown, UserCircle } from '@phosphor-icons/react';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import Select, { Option } from './Select';
import getUserLogged from '@/_utils/getUserLogged';

interface ISelect {
  onClick: (value: Option) => void;
}

export default function SelectUser({ onClick }: ISelect) {
  const users = useAtomValue(usersAtom);
  const userLogged = getUserLogged();
  const [open, setOpen] = useState(false);

  const userSelected = useMemo(() => {
    return {
      value: userLogged.user,
      label: userLogged.name,
    };
  }, [userLogged]);

  const usersOptions = useMemo(() => {
    return users.map((user) => {
      return {
        value: user.user,
        label: user.name,
        isDisabled: user.name === userLogged.name,
      };
    });
  }, [users, userLogged]);

  const handleClick = useCallback(
    (item: Option) => {
      onClick(item);
      setOpen(false);
    },
    [users],
  );

  return (
    <div className="w-full">
      {userLogged && !open ? (
        <div
          onClick={() => setOpen(true)}
          className="group w-full h-12 flex gap-2 items-center border border-white hover:border-[#E0E0E0] rounded-lg cursor-pointer px-2"
        >
          <UserCircle size={32} weight="duotone" className="text-gray-500" />
          <span className="text-lg">{userLogged.name}</span>
          <CaretDown
            size={16}
            className="m-auto text-gray-400 hidden group-hover:flex"
          />
        </div>
      ) : (
        <Select
          placeholder="Select user"
          value={userSelected}
          onClick={(e) => handleClick(e)}
          options={usersOptions}
          menuIsOpen={open}
          onMenuClose={() => setOpen(false)}
          isHeader
        />
      )}
    </div>
  );
}
