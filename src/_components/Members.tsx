import { IUser } from '@/_atoms/users-atoms';
import getNameInitials from '@/_utils/getNameInitials';
import randomColor from '@/_utils/randomColor';
import Image from 'next/image';
import { Fragment } from 'react';

export function Members({ members }: { members: IUser[] }) {
  return (
    <div className="flex gap-1">
      {members?.map((member, idx) => (
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
  );
}
