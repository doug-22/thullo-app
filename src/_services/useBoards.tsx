import { IBoard } from '@/_atoms/board-selected.atom';
import { IUser } from '@/_atoms/users-atoms';
import { ITask } from '@/_components/TaskCard';
import getUserLogged from '@/_utils/getUserLogged';
import { useQuery } from '@tanstack/react-query';

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

  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  tasks.push({
    idBoard: indexId,
    columns: [{ title: 'Todo', tasks: [] }],
  });

  const tasksStringify = JSON.stringify(tasks);
  localStorage.setItem('tasks', tasksStringify);
}

export async function setUpdateMembers(newMember: IUser, idBoard: number) {
  const boards: IBoard[] = localStorage.getItem('boards')
    ? JSON.parse(localStorage.getItem('boards') ?? '[]')
    : [];

  const newBoards = boards?.map((board) => {
    if (board?.id === idBoard) {
      return {
        ...board,
        members: [...board.members, newMember],
      };
    }
    return board;
  });

  const boardsStringify = JSON.stringify(newBoards);
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
