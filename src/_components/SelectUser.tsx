import { usersAtom } from '@/_atoms/users-atoms';
import { CaretDown, CaretUp, UserCircle } from '@phosphor-icons/react';
import { useAtomValue } from 'jotai';
import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import { Option } from './Select';
import getUserLogged from '@/_utils/getUserLogged';
import { useBoards } from '@/_services/useBoards';

interface ISelect {
  onClick: (value: Option) => void;
}

export default function SelectUser({ onClick }: ISelect) {
  const users = useAtomValue(usersAtom);
  const userLogged = getUserLogged();

  const usersOptions = useMemo(() => {
    return users.map((user) => {
      return {
        value: user.user,
        label: user.name,
      };
    });
  }, [users]);

  const [valueFilter, setValueFilter] = useState(userLogged.name ?? '');
  const [open, setOpen] = useState(false);

  const handleOpenSelect = (e: any, state: boolean) => {
    const target = e.target as HTMLDivElement;

    if (target.tagName === 'LI') {
      setOpen(false);
      return;
    }
    if (state && !open) {
      setOpen(true);
      return;
    }
    if (!state) {
      handleCloseSelect();
    }
  };

  const handleCloseSelect = () => {
    setTimeout(() => {
      setOpen(false);
    }, 70);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setValueFilter(value);
  };

  const handleClick = useCallback(
    (item: Option) => {
      onClick(item);
      setValueFilter(item.label);
    },
    [users],
  );

  const filteredOptions = useMemo(() => {
    return usersOptions.filter((item) => item.label !== userLogged.name);
  }, [userLogged]);

  return (
    <div
      className="w-full relative"
      onClick={(e) => handleOpenSelect(e, true)}
      onBlur={(e) => handleOpenSelect(e, false)}
    >
      {userLogged && !open ? (
        <div className="group w-full h-12 flex gap-2 items-center border border-white hover:border-[#E0E0E0] rounded-lg cursor-pointer px-2">
          <UserCircle size={32} weight="duotone" className="text-gray-500" />
          <span className="text-lg">{userLogged.name}</span>
          <CaretDown
            size={16}
            className="m-auto text-gray-400 hidden group-hover:flex"
          />
        </div>
      ) : (
        <div className="h-12">
          <input
            className="w-full h-full rounded-lg border border-[#E0E0E0] p-2 shadow-md focus:outline focus:outline-[#2F80ED]"
            value={valueFilter}
            onChange={(e) => handleChange(e)}
          />

          <button className="absolute right-0 top-1/2 translate-y-[-50%] w-[42px] h-[42px] rounded-lg">
            {!open && <CaretDown size={16} className="m-auto text-gray-400" />}
            {open && <CaretUp size={16} className="m-auto text-gray-400" />}
          </button>
        </div>
      )}
      <ul
        className={`absolute z-[1] w-full bg-white rounded-lg shadow-md mt-1 py-2 ${
          open ? 'block' : 'hidden'
        }`}
      >
        {filteredOptions?.map((option, index) => (
          <li
            key={index}
            className="cursor-pointer hover:bg-gray-200 p-2"
            onClick={() => handleClick(option)}
          >
            {option.label}
          </li>
        ))}
      </ul>
    </div>
  );
}
