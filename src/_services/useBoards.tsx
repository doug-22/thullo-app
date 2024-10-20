import { useQuery } from '@tanstack/react-query';
import getUserLogged from '@/_utils/getUserLogged';
import { IUser } from '@/_atoms/users-atoms';

export interface IBoard {
  title: string;
  cover: string | null;
  public: boolean;
  members: IUser[];
}

export interface IBoard {
  id?: number;
  title: string;
  cover: string | null;
  public: boolean;
  members: IUser[];
}

export function getBoards(): IBoard[] {
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
  return boardsByUser;
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

export function useBoards() {
  const { data, ...rest } = useQuery({
    queryKey: ['getBoards'],
    queryFn: () => getBoards(),
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
