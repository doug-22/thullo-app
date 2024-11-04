import Input from './Input';
import Button from './Button';
import { GlobeHemisphereEast, LockKey, Plus, X } from '@phosphor-icons/react';
import { useCallback, useMemo, useState } from 'react';
import { modalAtom } from '@/_atoms/modal-atom';
import { useSetAtom } from 'jotai';
import { createBoardSchema } from '@/_utils/createBoardSchema';
import { toast } from 'react-toastify';
import getUserLogged from '@/_utils/getUserLogged';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { setBoard } from '@/_services/useBoards';
import Select, { Option } from './Select';
import { IUser } from '@/_atoms/users-atoms';
import { IBoard } from '@/_atoms/board-selected.atom';
import { usersMock } from '@/_mocks/boards';

interface IForm {
  title: string;
  cover: string;
  public: boolean;
  members: IUser[];
}

export default function AddBoardModal() {
  const setModal = useSetAtom(modalAtom);
  const userLogged = getUserLogged();
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: (data: IBoard) => setBoard(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBoards'] });
      toast.success('Board created successfully!');
    },
  });

  const [form, setForm] = useState<IForm>({
    title: '',
    cover: '',
    public: false,
    members: [],
  });
  const validateSchema = createBoardSchema.safeParse(form);

  const onChangeValue = (
    key: 'title' | 'cover' | 'public',
    value: string | boolean,
  ) => {
    setForm({ ...form, [key]: value });
  };

  const onCloseModal = () => {
    setModal({
      title: null,
      content: null,
    });
  };

  const createBoard = useCallback(() => {
    if (!validateSchema.success) {
      toast.error(validateSchema.error?.errors[0].message);
      return;
    }
    mutate({ ...form, members: [userLogged, ...form.members] });
    onCloseModal();
  }, [form]);

  const handleAddMember = useCallback(
    (value: Option) => {
      const newMember = {
        name: value?.label,
        user: value?.value as string,
        password: 'password',
      };
      setForm({ ...form, members: [newMember, ...form.members] });
    },
    [form],
  );

  const handleRemoveMember = useCallback(
    (name: string) => {
      const membersFiltered = form.members?.filter(
        (member) => member.name !== name,
      );
      setForm({ ...form, members: [...membersFiltered] });
    },
    [form],
  );

  const usersOptions = useMemo(() => {
    return usersMock
      ?.filter((user) => {
        const index = form.members.findIndex(
          (member) => member.user === user.user,
        );
        if (index === -1 && user.user !== userLogged.user) {
          return user;
        }
      })
      ?.map((user) => {
        return {
          value: user.user,
          label: user.name,
        };
      });
  }, [usersMock, form]);

  return (
    <div className="flex flex-col gap-3">
      <Input
        label="Board title"
        placeholder="Add board title"
        name="title"
        value={form.title}
        onChange={(e) => onChangeValue('title', e)}
      />
      <Input
        label="Cover link"
        placeholder="Add cover link"
        name="cover"
        value={form.cover}
        onChange={(e) => onChangeValue('cover', e)}
      />
      <div className="flex justify-between">
        <Button
          label="Private"
          variant={!form.public ? 'primary' : 'secondary'}
          icon={<LockKey size={22} />}
          onClick={() => onChangeValue('public', false)}
        />
        <Button
          label="Public"
          variant={form.public ? 'primary' : 'secondary'}
          icon={<GlobeHemisphereEast size={22} />}
          onClick={() => onChangeValue('public', true)}
        />
      </div>
      {!form.public && (
        <div>
          <Select
            label="Members"
            placeholder="Select user"
            onClick={handleAddMember}
            options={usersOptions}
          />
          {form.members?.length > 0 && (
            <div className="rounded-lg border border-[#E0E0E0] p-2 mt-2 flex gap-1 flex-wrap max-w-72">
              {form.members?.map((member, idx) => (
                <div
                  key={idx}
                  className="bg-[#2F80ED] py-1 px-2 rounded-md text-white flex items-center gap-1"
                >
                  <span className="text-sm leading-normal">{member.name}</span>
                  <button onClick={() => handleRemoveMember(member.name)}>
                    <X size={16} weight="bold" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      <div className="flex justify-end gap-2">
        <Button label="Cancel" variant="text" onClick={onCloseModal} />
        <Button
          label="Create"
          icon={<Plus size={22} />}
          onClick={() => createBoard()}
        />
      </div>
    </div>
  );
}
