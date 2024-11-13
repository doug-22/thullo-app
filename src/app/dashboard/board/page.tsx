'use client';

import { IBoard, boardSelectedAtom } from '@/_atoms/board-selected.atom';
import { modalAtom } from '@/_atoms/modal-atom';
import { AddUserPopover } from '@/_components/AddUserPopover';
import { CreateTaskModal } from '@/_components/CreateTaskModal';
import { DropZone } from '@/_components/DropZone';
import { Members } from '@/_components/Members';
import { ITask } from '@/_components/TaskCard';
import { useBoards } from '@/_services/useBoards';
import {
  setColumn,
  setUpdateColumns,
  useTaskCards,
} from '@/_services/useTaskCards';
import { CButton, CPopover } from '@coreui/react';
import {
  CheckCircle,
  GlobeHemisphereEast,
  Plus,
  XCircle,
} from '@phosphor-icons/react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useAtom, useSetAtom } from 'jotai';
import { useCallback, useEffect, useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { toast } from 'react-toastify';

export default function Dashboard() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const id = urlParams.get('id');
  const queryClient = useQueryClient();
  const [boardSelected, setBoardSelected] = useAtom(boardSelectedAtom);
  const setModal = useSetAtom(modalAtom);
  const { data: boards } = useBoards(Number(boardSelected?.id ?? id));
  const { data: tasks } = useTaskCards(Number(boardSelected?.id ?? id));
  const [board, setBoard] = useState<IBoard | null>(null);
  const [newColumn, setNewColumn] = useState({
    isOpen: false,
    title: '',
  });
  const [popoverOpen, setPopoverOpen] = useState(false);

  const [dropZones, setDropZones] = useState<
    { title: string; tasks: ITask[] }[]
  >([]);

  useEffect(() => {
    setBoard(boards[0]);
    setBoardSelected(boards[0]);
    setDropZones(tasks);
  }, [boards, tasks]);

  const { mutate: mutateCreateColumn } = useMutation({
    mutationFn: (data: string) => setColumn(data, Number(boardSelected?.id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTaskCards'] });
      toast.success('Column created successfully!');
      setNewColumn({ title: '', isOpen: false });
    },
  });

  const { mutate: mutateUpateColumns } = useMutation({
    mutationFn: (
      data: {
        title: string;
        tasks: ITask[];
      }[],
    ) => setUpdateColumns(Number(boardSelected?.id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getTaskCards'] });
    },
  });

  const setCreateTaskModal = (task?: ITask) => {
    setModal({
      title: 'create task',
      content: (
        <CreateTaskModal idBoard={Number(boardSelected?.id)} task={task} />
      ),
    });
  };

  const handleCreateNewColumn = useCallback(() => {
    mutateCreateColumn(newColumn.title);
  }, [newColumn]);

  const handleDrop = (item: any, targetZoneIndex: any) => {
    setDropZones((prevZones) => {
      const sourceZoneIndex = prevZones.findIndex((zone) =>
        zone.tasks.some((i) => i.id === item.id),
      );

      const updatedZones = prevZones.map((zone, index) => {
        if (sourceZoneIndex === targetZoneIndex) {
          return zone;
        }
        if (index === sourceZoneIndex) {
          return { ...zone, tasks: zone.tasks.filter((i) => i.id !== item.id) };
        }
        if (index === targetZoneIndex) {
          return { ...zone, tasks: [...zone.tasks, item] };
        }
        return zone;
      });

      mutateUpateColumns(updatedZones);
      return updatedZones;
    });
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-2 bg-gray-300 w-max text-gray-600 p-2 rounded-lg">
          <GlobeHemisphereEast size={22} weight="duotone" />
          <span>{board?.public ? 'Public' : 'Private'}</span>
        </div>
        <Members members={board?.members ?? []} />
        <CPopover
          content={
            <AddUserPopover
              idBoard={Number(boardSelected?.id)}
              close={() => setPopoverOpen(false)}
            />
          }
          placement="bottom"
          className="shadow-lg max-w-80"
          visible={popoverOpen}
        >
          <CButton className="w-9 h-9 p-0 bg-[#2F80ED] text-white shadow-md hover:bg-[#2b76d8] hover:drop-shadow-lg hover:scale-100">
            <Plus
              size={22}
              weight="bold"
              className="m-auto"
              onClick={() => setPopoverOpen(!popoverOpen)}
            />
          </CButton>
        </CPopover>
      </div>

      <DndProvider backend={HTML5Backend}>
        <div className="w-full bg-gray-200 rounded-lg p-2 flex gap-4 overflow-auto">
          {dropZones.map((zone, index) => (
            <div key={index} className=" flex flex-col gap-1">
              <div>
                <h2>{zone.title}</h2>
                <DropZone
                  onDrop={(item: any) => handleDrop(item, index)}
                  items={zone.tasks}
                  setTaskModal={setCreateTaskModal}
                />
              </div>
              {index === 0 && (
                <button
                  className="bg-blue-300 rounded-lg text-blue-600 flex justify-between items-center shadow-md px-2 py-1 text-sm"
                  onClick={() => setCreateTaskModal()}
                >
                  <span>Add another task</span>
                  <Plus size={16} weight="bold" />
                </button>
              )}
            </div>
          ))}
          <div className="flex gap-1 h-[28px] items-center">
            {newColumn.isOpen && (
              <>
                <input
                  value={newColumn.title}
                  onChange={(e) =>
                    setNewColumn({ ...newColumn, title: e.target.value })
                  }
                  placeholder="Add column title"
                  className="border border-[#E0E0E0] rounded-lg text-sm pl-2 focus:outline focus:outline-[#2F80ED] h-full"
                />
                <CheckCircle
                  size={22}
                  weight="light"
                  className="cursor-pointer hover:text-green-500"
                  onClick={handleCreateNewColumn}
                />
                <XCircle
                  size={22}
                  weight="light"
                  className="cursor-pointer hover:text-red-500"
                  onClick={() => setNewColumn({ ...newColumn, isOpen: false })}
                />
              </>
            )}
            {!newColumn.isOpen && (
              <button
                className="bg-blue-300 rounded-lg text-blue-600 flex justify-between items-center shadow-md px-2 py-1 text-sm h-max w-max"
                onClick={() => setNewColumn({ ...newColumn, isOpen: true })}
              >
                <span>Add a list</span>
                <Plus size={16} weight="bold" />
              </button>
            )}
          </div>
        </div>
      </DndProvider>
    </div>
  );
}
