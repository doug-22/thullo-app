import { XCircle } from '@phosphor-icons/react';
import Button from './Button';

export interface ITag {
  title: string;
  type: 'feature' | 'bug' | 'custom';
  removeTag?: () => void;
}

export function Tag({ title, type, removeTag }: ITag) {
  const bgColors = {
    feature: 'bg-green-300',
    bug: 'bg-red-300',
    custom: 'bg-blue-300',
  };
  const labelColors = {
    feature: 'text-green-700',
    bug: 'text-red-700',
    custom: 'text-blue-700',
  };

  return (
    <div
      className={`px-2 text-sm rounded-[25px] ${bgColors[type]} ${labelColors[type]} flex gap-1 items-center`}
    >
      <span>{title}</span>
      {removeTag && (
        <XCircle
          size={18}
          weight="light"
          onClick={removeTag}
          className="text-gray-500 cursor-pointer"
        />
      )}
    </div>
  );
}
