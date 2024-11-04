import { useDrag } from 'react-dnd';
import { ITask, TaskCard } from './TaskCard';

export function ItemDropZone({
  item,
  setTaskModal,
}: {
  item: ITask;
  setTaskModal: (task: ITask) => void;
}) {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: 'ITEM',
    item,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div
      ref={drag as any}
      style={{
        opacity: isDragging ? 0.5 : 1,
        cursor: 'move',
      }}
      onClick={() => setTaskModal(item)}
    >
      <TaskCard
        title={item.title}
        remainingTime={item.remainingTime}
        owners={item.owners}
        tags={item.tags}
      />
    </div>
  );
}
