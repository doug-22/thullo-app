import { useQuery } from '@tanstack/react-query';
import getUserLogged from '@/_utils/getUserLogged';
import { IBoard } from '@/_atoms/board-selected.atom';

export function getBoards(id?: number): IBoard[] {
  const userLogged = getUserLogged();

  const boards: IBoard[] = localStorage.getItem('boards')
    ? JSON.parse(localStorage.getItem('boards') ?? '[]')
    : [];

  const boardsByUser = boards.filter((board) => {
    if (board.public) {
      return board;
    }
    const index = board.members.findIndex(
      (member) => member.name === userLogged.name,
    );

    if (index !== -1) {
      return board;
    }
  });

  const boardsById = boardsByUser.filter((board) => {
    if (id) {
      if (board.id === id) {
        return board;
      }
      return;
    }
  });

  return id ? boardsById : boardsByUser;
}

export async function setBoard(newBoard: IBoard) {
  const boards: IBoard[] = localStorage.getItem('boards')
    ? JSON.parse(localStorage.getItem('boards') ?? '[]')
    : [];

  const indexId = boards.length + 1;
  const boardsStringify = JSON.stringify([
    ...boards,
    { ...newBoard, id: indexId },
  ]);
  localStorage.setItem('boards', boardsStringify);
}

export function useBoards(id?: number) {
  const { data, ...rest } = useQuery({
    queryKey: ['getBoards', id],
    queryFn: () => getBoards(id),
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
