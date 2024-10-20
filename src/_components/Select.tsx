import { CaretDown, CaretUp } from '@phosphor-icons/react';
import { ChangeEvent, useMemo, useState } from 'react';

export type Option = {
  value: string | number;
  label: string;
};

interface ISelect {
  label: string;
  placeholder: string;
  value: Option | null;
  onClick: (value: Option) => void;
  options: Option[];
}

export default function Select({
  label,
  onClick,
  options,
  placeholder,
}: ISelect) {
  const [valueFilter, setValueFilter] = useState('');
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

  const handleClick = (item: Option) => {
    onClick(item);
    setValueFilter(item.label);
  };

  const filteredOptions = useMemo(() => {
    return options.filter((item) => item.label.includes(valueFilter));
  }, [valueFilter]);

  return (
    <div className="w-full">
      <label className="pl-1 text-sm font-semibold text-gray-600">
        {label}
      </label>
      <div
        className="relative"
        onClick={(e) => handleOpenSelect(e, true)}
        onBlur={(e) => handleOpenSelect(e, false)}
      >
        <div>
          <input
            className="w-full rounded-lg border border-[#E0E0E0] p-2 shadow-md focus:outline focus:outline-[#2F80ED]"
            placeholder={placeholder}
            value={valueFilter}
            onChange={(e) => handleChange(e)}
          />

          <button className="absolute right-0 top-1/2 translate-y-[-50%] w-[42px] h-[42px] rounded-lg">
            {!open && <CaretDown size={16} className="m-auto text-gray-400" />}
            {open && <CaretUp size={16} className="m-auto text-gray-400" />}
          </button>
        </div>
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
    </div>
  );
}
