import { modalAtom } from '@/_atoms/modal-atom';
import { useAtomValue, useSetAtom } from 'jotai';
import { MouseEvent } from 'react';
import Button from './Button';
import { Plus, X } from '@phosphor-icons/react';

export default function BackgroundModal() {
  const modal = useAtomValue(modalAtom);
  const setModal = useSetAtom(modalAtom);

  const handleOutsideCloseModal = (
    e: MouseEvent<HTMLDivElement, globalThis.MouseEvent>,
  ) => {
    const { id } = e.target as HTMLDivElement;
    if (id === 'modal') {
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setModal({
      title: null,
      content: null,
    });
  };
  return (
    <div
      id="modal"
      onClick={(e) => handleOutsideCloseModal(e)}
      className="bg-gray-200/50 w-full h-full fixed z-10 top-0 left-0 flex backdrop-blur-sm"
    >
      <div className="w-80 m-auto bg-white p-3 rounded-lg shadow-md animate-scale-up relative">
        <Button
          icon={<X size={22} />}
          onClick={handleCloseModal}
          className="ml-auto absolute top-[-17px] right-[-17px]"
        />
        <div className="mt-2">{modal.content}</div>
      </div>
    </div>
  );
}
