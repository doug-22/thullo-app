import { useCallback, useMemo, useState } from 'react';
import Input from './Input';
import { IUser } from '@/_atoms/users-atoms';
import Select, { Option } from './Select';
import { ITag, Tag } from './Tag';
import Button from './Button';
import { CheckCircle, Plus, XCircle } from '@phosphor-icons/react';
import { modalAtom } from '@/_atoms/modal-atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { ITask } from './TaskCard';
import { createTaskSchema } from '@/_utils/createTaskSchema';
import { toast } from 'react-toastify';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setTask, setUpdateTask } from '@/_services/useTaskCards';
import { boardSelectedAtom } from '@/_atoms/board-selected.atom';

interface IForm {
  title: string;
  description: string;
  tag: Option | null;
  tags: ITag[];
  remainingTime: number;
  owners: IUser[];
}

export function CreateTaskModal({
  idBoard,
  task,
}: {
  idBoard: number;
  task?: ITask;
}) {
  const boardSelected = useAtomValue(boardSelectedAtom);
  const queryClient = useQueryClient();
  const setModal = useSetAtom(modalAtom);
  const [customTag, setCustomTag] = useState({
    visible: false,
    value: '',
  });
  const [form, setForm] = useState<IForm>({
    title: task?.title ?? '',
    description: task?.description ?? '',
    tag: null,
    tags: task?.tags ?? [],
    remainingTime: task?.remainingTime ?? 0,
    owners: task?.owners ?? [],
  });

  const usersOptions = useMemo(() => {
    return boardSelected?.members?.map((user) => {
      return {
        value: user.user,
        label: user.name,
      };
    });
  }, [boardSelected]);

  const [ownerSelected, setOwnerSelected] = useState<Option | undefined>(
    task
      ? {
          value: task.owners[0].user,
          label: task.owners[0].name,
        }
      : undefined,
  );

  const { mutate: mutateCreateTask } = useMutation({
    mutationFn: (data: ITask) => setTask(data, idBoard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTaskCards'] });
      toast.success('Task created successfully!');
    },
  });

  const { mutate: mutateUpdateTask } = useMutation({
    mutationFn: (data: ITask) => setUpdateTask(data, idBoard, task?.id!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTaskCards'] });
      toast.success('Task updated successfully!');
    },
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

  const handleOwner = useCallback(
    (value: Option) => {
      const memberSelected = boardSelected?.members.find(
        (member) => member.user === value.value,
      );
      setForm({ ...form, owners: [memberSelected!] });
      setOwnerSelected(value);
    },
    [form, boardSelected],
  );

  const createTask = useCallback(() => {
    const newForm: ITask = {
      title: form.title,
      description: form.description,
      owners: form.owners,
      remainingTime: Number(form.remainingTime),
      tags: form.tags,
    };
    const validateSchema = createTaskSchema.safeParse(newForm);

    if (!validateSchema.success) {
      toast.error(validateSchema.error?.errors[0].message);
      return;
    }
    mutateCreateTask(newForm);
    onCloseModal();
  }, [form]);

  const updateTask = useCallback(() => {
    const newForm: ITask = {
      title: form.title,
      description: form.description,
      owners: form.owners,
      remainingTime: Number(form.remainingTime),
      tags: form.tags,
    };
    const validateSchema = createTaskSchema.safeParse(newForm);

    if (!validateSchema.success) {
      toast.error(validateSchema.error?.errors[0].message);
      return;
    }
    mutateUpdateTask(newForm);
    onCloseModal();
  }, [form]);

  const onCloseModal = () => {
    setModal({
      title: null,
      content: null,
    });
  };

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
        <Select
          label="Owner"
          value={ownerSelected}
          placeholder="Select user"
          onClick={handleOwner}
          options={usersOptions ?? []}
        />
        <div className="flex gap-2 items-end">
          <Select
            label="Tags"
            placeholder="Add tag"
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
        <div className="flex justify-end gap-2">
          <Button label="Cancel" variant="text" onClick={onCloseModal} />
          <Button
            label={task ? 'Update' : 'Create'}
            icon={<Plus size={22} />}
            onClick={() => (task ? updateTask() : createTask())}
          />
        </div>
      </div>
    </div>
  );
}
