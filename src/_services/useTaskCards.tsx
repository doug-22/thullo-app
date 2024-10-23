import { ITask } from '@/_components/TaskCard';
import { useQuery } from '@tanstack/react-query';

export function getTaskCards(id: number): ITask[] {
  const tasks: ITask[] = localStorage.getItem('tasks')
    ? JSON.parse(localStorage.getItem('tasks') ?? '[]')
    : [];

  return tasks;
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
