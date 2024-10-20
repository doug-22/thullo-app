'use client';

import Image from 'next/image';
import {
  GlobeHemisphereEast,
  Image as ImageIcon,
  LockKey,
} from '@phosphor-icons/react';
import getNameInitials from '@/_utils/getNameInitials';
import { Fragment, HTMLAttributes } from 'react';
import randomColor from '@/_utils/randomColor';
import { IBoard } from '@/_services/useBoards';

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
        <Image
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
      <div className="flex gap-1">
        {board?.members?.map((member, idx) => (
          <Fragment key={idx}>
            {member?.photo ? (
              <Image src="" alt="cover" />
            ) : (
              <div
                suppressHydrationWarning
                className={`w-7 h-7 ${randomColor()} text-white flex justify-center items-center rounded-lg text-sm`}
              >
                {getNameInitials(member?.name)}
              </div>
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
