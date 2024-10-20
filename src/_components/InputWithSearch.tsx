import { XCircle } from '@phosphor-icons/react';
import { useState } from 'react';

interface IInputWithSearch {
  name: string;
  placeholder: string;
  onSearch: (value: string) => void;
}

export default function InputWithSearch({
  name,
  placeholder,
  onSearch,
}: IInputWithSearch) {
  const [value, setValue] = useState('');

  const clearFilter = () => {
    setValue('');
    onSearch('');
  };

  return (
    <div className="border border-[#E0E0E0] w-96 shadow-md flex justify-between gap-1 p-1 rounded-lg">
      <input
        type="text"
        className="w-full focus:outline-0 pl-2"
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value !== '' && (
        <button onClick={clearFilter}>
          <XCircle size={22} className="text-gray-500" />
        </button>
      )}
      <button
        className="bg-[#2F80ED] rounded-lg py-1 px-3 text-white shadow-md hover:bg-[#2a72cf] transition-all duration-200"
        onClick={() => onSearch(value)}
      >
        Search
      </button>
    </div>
  );
}
