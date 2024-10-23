'use client';

import { IBoard, boardSelectedAtom } from '@/_atoms/board-selected.atom';
import { modalAtom } from '@/_atoms/modal-atom';
import Button from '@/_components/Button';
import { CreateTaskModal } from '@/_components/CreateTaskModal';
import Header from '@/_components/Header';
import { Members } from '@/_components/Members';
import { TaskCard } from '@/_components/TaskCard';
import { useBoards } from '@/_services/useBoards';
import { useTaskCards } from '@/_services/useTaskCards';
import { Gear, GlobeHemisphereEast, Plus } from '@phosphor-icons/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useEffect, useMemo, useState } from 'react';

export default function Dashboard({ params }: { params: { id: string } }) {
  const setModal = useSetAtom(modalAtom);
  const { data: boards } = useBoards(Number(params.id));
  const { data: tasks } = useTaskCards(Number(params.id));
  const setBoardAtom = useSetAtom(boardSelectedAtom);
  const [board, setBoard] = useState<IBoard | null>(null);

  useEffect(() => {
    setBoard(boards[0]);
    setBoardAtom(boards[0]);
  }, [boards]);

  console.log(tasks);

  const setCreateTaskModal = () => {
    setModal({
      title: 'create task',
      content: <CreateTaskModal />,
    });
  };

  return (
    <div>
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2 bg-gray-300 w-max text-gray-600 p-2 rounded-lg">
          <GlobeHemisphereEast size={22} weight="duotone" />
          <span>{board?.public ? 'Public' : 'Private'}</span>
        </div>
        <Members members={board?.members ?? []} />
        <Button icon={<Plus size={22} weight="bold" />} />
      </div>

      <div>
        <TaskCard
          title="asdas asdasd asdasd asdasd asda"
          remainingTime={2}
          owners={[]}
          tags={[
            { title: 'teste', type: 'feature' },
            { title: 'sdfsd', type: 'bug' },
          ]}
        />
        <Button
          icon={<Plus size={22} weight="bold" />}
          onClick={setCreateTaskModal}
        />
      </div>
    </div>
  );
}
