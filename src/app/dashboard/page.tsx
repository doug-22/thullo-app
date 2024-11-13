'use client';

import { IBoard, boardSelectedAtom } from '@/_atoms/board-selected.atom';
import { filtersAtom } from '@/_atoms/filters-atom';
import { modalAtom } from '@/_atoms/modal-atom';
import AddBoardModal from '@/_components/AddBoardModal';
import Button from '@/_components/Button';
import CardBoard from '@/_components/CardBoard';
import { useBoards } from '@/_services/useBoards';
import { Plus } from '@phosphor-icons/react';
import { useAtomValue, useSetAtom } from 'jotai';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';

export default function Dashboard() {
  const router = useRouter();
  const boards = useBoards();
  const filters = useAtomValue(filtersAtom);
  const setModal = useSetAtom(modalAtom);
  const setBoardAtom = useSetAtom(boardSelectedAtom);

  const setAddBoardModal = () => {
    setModal({
      title: 'add board',
      content: <AddBoardModal />,
    });
  };

  const boardsFiltered = useMemo(() => {
    return boards?.data?.filter((board) => {
      return board.title.includes(filters.search);
    });
  }, [boards, filters]);

  const redirectToBoard = (board: IBoard) => {
    setBoardAtom(board);
    router.push(`/dashboard/board?id=${board.id}`);
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <h1 className="font-bold text-lg">All boards</h1>
        <Button
          label="Add"
          icon={<Plus size={22} />}
          onClick={setAddBoardModal}
        />
      </div>
      <div className="w-full flex flex-wrap gap-3">
        {boardsFiltered?.map((board) => (
          <CardBoard
            key={board.id}
            board={board}
            onClick={() => redirectToBoard(board)}
          />
        ))}
      </div>
    </div>
  );
}
