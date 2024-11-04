import { ITask } from '@/_components/TaskCard';
import { useQuery } from '@tanstack/react-query';

export function getTaskCards(id: number): { title: string; tasks: ITask[] }[] {
  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(
        localStorage.getItem('tasks') ??
          `[{"idBoard":${id},"columns":[{"title":"Todo","tasks":[]}]}]`,
      )
    : [];

  const findTasksById = tasks?.find((item) => item.idBoard === id);

  return findTasksById?.columns ?? [];
}

export async function setTask(newTask: ITask, idBoard: number) {
  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  if (tasks.length === 0) {
    const indexId = tasks.length + 1;

    const newTasks = {
      idBoard,
      columns: [
        {
          title: 'Todo',
          tasks: [{ ...newTask, id: indexId }],
        },
      ],
    };

    const tasksStringify = JSON.stringify([newTasks]);
    localStorage.setItem('tasks', tasksStringify);
  } else {
    const newTasks = tasks?.map((task) => {
      if (task.idBoard === idBoard) {
        const newColumns = task.columns?.map((column) => {
          const indexId = column.tasks.length + 1;
          if (column.title === 'Todo') {
            return {
              ...column,
              tasks: [...column.tasks, { ...newTask, id: indexId }],
            };
          }
          return column;
        });
        return {
          ...task,
          columns: newColumns,
        };
      }
      return task;
    });

    const tasksStringify = JSON.stringify(newTasks);
    localStorage.setItem('tasks', tasksStringify);
  }
}

export async function setUpdateTask(
  taskForm: ITask,
  idBoard: number,
  idTask: number,
) {
  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  const newTasks = tasks?.map((task) => {
    if (task.idBoard !== idBoard) {
      return task;
    }

    const updatedColumns = task.columns.map((column) => {
      const updatedTasks = column.tasks.map((task) =>
        task.id === idTask ? { ...task, ...taskForm } : task,
      );

      return { ...column, tasks: updatedTasks };
    });

    return { ...task, columns: updatedColumns };
  });

  const tasksStringify = JSON.stringify(newTasks);
  localStorage.setItem('tasks', tasksStringify);
}

export async function setColumn(title: string, idBoard: number) {
  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  const findColumnsById = tasks?.find(
    (item) => item.idBoard === idBoard,
  )?.columns;

  findColumnsById?.push({ title: title, tasks: [] });

  const newTasks = tasks?.map((board) => {
    if (board.idBoard === idBoard) {
      return {
        ...board,
        columns: findColumnsById,
      };
    }
    return board;
  });

  const tasksStringify = JSON.stringify(newTasks);
  localStorage.setItem('tasks', tasksStringify);
}

export async function setUpdateColumns(
  idBoard: number,
  newColumns: {
    title: string;
    tasks: ITask[];
  }[],
) {
  const tasks: {
    idBoard: number;
    columns: {
      title: string;
      tasks: ITask[];
    }[];
  }[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  const newTasks = tasks?.map((board) => {
    if (board.idBoard === idBoard) {
      return {
        ...board,
        columns: newColumns,
      };
    }
    return board;
  });

  const tasksStringify = JSON.stringify(newTasks);
  localStorage.setItem('tasks', tasksStringify);
}

export function useTaskCards(id: number) {
  const { data, ...rest } = useQuery({
    queryKey: ['getTaskCards', id],
    queryFn: () => getTaskCards(id),
  });

  return {
    data: data ?? [],
    ...rest,
  };
}
