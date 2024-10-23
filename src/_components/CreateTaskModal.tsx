import { useCallback, useState } from 'react';
import Input from './Input';
import { IUser } from '@/_atoms/users-atoms';
import Select, { Option } from './Select';
import { ITag, Tag } from './Tag';
import Button from './Button';
import { CheckCircle, XCircle } from '@phosphor-icons/react';

interface IForm {
  title: string;
  description: string;
  tag: Option | null;
  tags: ITag[];
  remainingTime: number;
  owners: IUser[];
}

export function CreateTaskModal() {
  const [customTag, setCustomTag] = useState({
    visible: false,
    value: '',
  });
  const [form, setForm] = useState<IForm>({
    title: '',
    description: '',
    tag: null,
    tags: [],
    remainingTime: 0,
    owners: [],
  });

  const onChangeValue = (
    key: 'title' | 'remainingTime' | 'description',
    value: string | number,
  ) => {
    setForm({ ...form, [key]: value });
  };

  const handleAddCustomTag = useCallback(() => {
    const newTag: ITag = {
      title: customTag.value,
      type: 'custom',
    };
    const tags = form.tags;
    setForm({ ...form, tags: [...tags, newTag] });
    setCustomTag({ value: '', visible: false });
  }, [customTag, form]);

  const handleAddTag = useCallback(
    (tag: Option) => {
      const newTag: ITag = {
        title: tag.label,
        type: tag.value as 'feature' | 'bug',
      };
      const tags = form.tags;
      setForm({ ...form, tags: [...tags, newTag] });
    },
    [form],
  );

  const handleRemoveTag = useCallback(
    (index: number) => {
      const tags = form.tags;
      tags.splice(index, 1);
      setForm({ ...form, tags: [...tags] });
    },
    [form],
  );

  return (
    <div className="grid grid-cols-[1.5fr_1fr] gap-2">
      <div className="border-r border-[#E0E0E0] pr-2 flex flex-col gap-2">
        <Input
          label="Task title"
          placeholder="Add task title"
          name="title"
          value={form.title}
          onChange={(e) => onChangeValue('title', e)}
        />
        <div>
          <label className="pl-1 text-sm font-semibold text-gray-600">
            Description
          </label>
          <textarea
            name="description"
            rows={5}
            value={form.description}
            onChange={(e) => onChangeValue('description', e.target.value)}
            className="w-full border border-[#E0E0E0] rounded-lg shadow-sm p-3"
          ></textarea>
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2 items-end">
          <Select
            label="Tags"
            placeholder="Add tag"
            value={form.tag}
            options={[
              { label: 'Feature', value: 'feature' },
              { label: 'Bug', value: 'bug' },
            ]}
            onClick={(e) => handleAddTag(e)}
          />
          <Button
            label="Custom tag"
            variant="text"
            onClick={() =>
              setCustomTag({ ...customTag, visible: !customTag.visible })
            }
          />
        </div>
        {customTag.visible && (
          <div className="flex gap-2 items-end">
            <Input
              label="Custom tag"
              placeholder="Add custom tag"
              name="title"
              value={customTag.value}
              onChange={(e) => setCustomTag({ ...customTag, value: e })}
            />
            <Button
              icon={<CheckCircle size={22} weight="light" />}
              variant="text"
              onClick={handleAddCustomTag}
            />
            <Button
              icon={<XCircle size={22} weight="light" />}
              variant="text"
              onClick={() =>
                setCustomTag({ ...customTag, visible: !customTag.visible })
              }
            />
          </div>
        )}
        {form.tags?.length > 0 && (
          <div>
            <label className="pl-1 text-sm font-semibold text-gray-600">
              Tags
            </label>
            <div className="p-2 rounded-lg flex gap-2 border border-[#E0E0E0] flex-wrap">
              {form.tags?.map((tag, idx) => (
                <Tag
                  key={idx}
                  title={tag.title}
                  type={tag.type}
                  removeTag={() => handleRemoveTag(idx)}
                />
              ))}
            </div>
          </div>
        )}
        <Input
          label="Original estimate"
          placeholder="Add original estimate"
          name="remainingTime"
          value={form.remainingTime}
          type="number"
          onChange={(e) => onChangeValue('remainingTime', e)}
        />
      </div>
    </div>
  );
}
