'use client';

import {
  GlobeHemisphereEast,
  Image as ImageIcon,
  LockKey,
} from '@phosphor-icons/react';
import { HTMLAttributes } from 'react';
import { IBoard } from '@/_atoms/board-selected.atom';
import { Members } from './Members';

interface ICardBoard extends HTMLAttributes<HTMLDivElement> {
  board: IBoard;
}

export default function CardBoard({ board, ...props }: ICardBoard) {
  return (
    <div
      {...props}
      className="bg-white rounded-lg w-[250px] shadow-md p-3 flex flex-col gap-2 cursor-pointer"
    >
      {board?.cover ? (
        <img
          src={board.cover}
          alt="cover"
          width={100}
          height={50}
          className="w-full h-24 object-cover object-center rounded-lg"
        />
      ) : (
        <div className="w-full h-24 rounded-lg bg-gray-300 flex">
          <ImageIcon size={36} className="m-auto text-gray-500" />
        </div>
      )}
      <div className="flex justify-between items-center">
        <h3 className="font-bold text-gray-600">{board.title}</h3>
        {board.public ? (
          <GlobeHemisphereEast size={22} weight="duotone" />
        ) : (
          <LockKey size={22} weight="duotone" />
        )}
      </div>
      <Members members={board?.members} />
    </div>
  );
}
