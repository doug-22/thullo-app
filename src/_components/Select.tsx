import { useEffect, useRef } from 'react';
import ReactSelect from 'react-select';

export type Option = {
  value: string | number;
  label: string;
};

interface ISelect {
  label?: string;
  placeholder: string;
  value?: Option;
  onClick: (value: Option) => void;
  options: Option[];
  menuIsOpen?: boolean;
  onMenuClose?: () => void;
  isHeader?: boolean;
}

export default function Select({
  label,
  onClick,
  options,
  value,
  placeholder,
  menuIsOpen,
  onMenuClose,
  isHeader,
}: ISelect) {
  const selectRef = useRef(null);

  useEffect(() => {
    if (menuIsOpen && selectRef.current) {
      (selectRef.current as any).focus();
    }
  }, [menuIsOpen]);

  return (
    <div className="w-full">
      {label && (
        <label className="pl-1 text-sm font-semibold text-gray-600">
          {label}
        </label>
      )}
      <ReactSelect
        ref={selectRef}
        placeholder={placeholder}
        value={value}
        options={options}
        classNamePrefix="react-select"
        onChange={(e) => onClick(e!)}
        menuIsOpen={menuIsOpen}
        onMenuClose={onMenuClose}
        className={isHeader ? 'header-height' : ''}
      />
    </div>
  );
}
