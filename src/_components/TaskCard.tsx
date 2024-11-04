import { IUser } from '@/_atoms/users-atoms';
import { shortString } from '@/_utils/shortString';
import { ITag, Tag } from './Tag';
import { Members } from './Members';

export interface ITask {
  title: string;
  description?: string;
  tags: ITag[];
  remainingTime: number;
  owners: IUser[];
  id?: number;
}

export function TaskCard({ title, tags, remainingTime, owners }: ITask) {
  return (
    <div className="bg-white rounded-lg p-4 shadow-sm w-60 flex flex-col gap-2">
      <h1 className="text-xl font-bold" title={title}>
        {shortString(title)}
      </h1>
      <div className="flex gap-1">
        {tags?.map((tag, idx) => (
          <Tag key={idx} title={tag.title} type={tag.type} />
        ))}
      </div>
      <p className="text-sm">Remaining time: {remainingTime} hours</p>
      <Members members={owners ?? []} />
    </div>
  );
}
