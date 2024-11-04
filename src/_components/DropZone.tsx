import { useDrop } from 'react-dnd';
import { ItemDropZone } from './ItemDropZone';
import { ITask, TaskCard } from './TaskCard';

export function DropZone({
  onDrop,
  items,
  setTaskModal,
}: {
  onDrop: (item: any) => void;
  items: ITask[];
  setTaskModal: () => void;
}) {
  const [{ isOver }, drop] = useDrop(() => ({
    accept: 'ITEM',
    drop: (item) => onDrop(item),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    }),
  }));

  return (
    <div
      ref={drop as any}
      style={{
        padding: '16px',
        minHeight: '200px',
        minWidth: '220px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        backgroundColor: isOver ? 'lightgreen' : 'lightgray',
      }}
    >
      {items.map((item) => (
        <ItemDropZone key={item.id} item={item} setTaskModal={setTaskModal} />
      ))}
    </div>
  );
}
