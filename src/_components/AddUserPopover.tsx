import { boardSelectedAtom } from '@/_atoms/board-selected.atom';
import { IUser } from '@/_atoms/users-atoms';
import { usersMock } from '@/_mocks/boards';
import { setUpdateMembers } from '@/_services/useBoards';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtomValue } from 'jotai';
import { useCallback, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import Button from './Button';
import Select, { Option } from './Select';

export function AddUserPopover({
  idBoard,
  close,
}: {
  idBoard: number;
  close: () => void;
}) {
  const boardSelected = useAtomValue(boardSelectedAtom);
  const queryClient = useQueryClient();

  const usersOptions = useMemo(() => {
    const members = boardSelected?.members.map((member) => member.user);
    return usersMock
      ?.filter((user) => !members?.includes(user.user))
      .map((item) => {
        return {
          label: item.name,
          value: item.user,
        };
      });
  }, [boardSelected]);

  const [newMemberSelected, setNewMemberSelected] = useState<
    Option | undefined
  >(undefined);

  const { mutate: mutateUpdateMembers } = useMutation({
    mutationFn: (data: IUser) => setUpdateMembers(data, idBoard),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getBoards'] });
      toast.success('New member add successfully!');
      close();
    },
  });

  const updateMembers = useCallback(() => {
    const form = usersMock.find(
      (user) => user.user === newMemberSelected?.value,
    );
    if (!newMemberSelected) {
      toast.error('Select a new member!');
      return;
    }
    mutateUpdateMembers(form!);
  }, [newMemberSelected, usersMock]);

  return (
    <div className="flex flex-col gap-2 w-72">
      <Select
        label="Add member"
        value={newMemberSelected}
        placeholder="Select user"
        onClick={setNewMemberSelected}
        options={usersOptions ?? []}
      />

      <div className="flex gap-2 justify-end">
        <Button label="Cancel" variant="text" onClick={close} />
        <Button label={'Update'} onClick={() => updateMembers()} />
      </div>
    </div>
  );
}
