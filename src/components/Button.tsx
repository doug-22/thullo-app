interface IButton {
  label: string;
  type?: 'primary' | 'text';
  onClick: () => void;
}

export default function Button({ label, type = 'primary', onClick }: IButton) {
  const bgColors = {
    primary: 'bg-[#2F80ED]',
    text: 'bg-transparent',
  };
  const labelColors = {
    primary: 'text-white',
    text: 'text-gray-500',
  };
  const fontSize = {
    primary: 'text-base',
    text: 'text-xs',
  };
  return (
    <button
      className={`min-w-28 p-1 scale-95 transition-all duration-200 ${
        bgColors[type]
      } rounded-lg ${labelColors[type]} ${fontSize[type]} ${
        type !== 'text' ? 'shadow-md hover:drop-shadow-lg hover:scale-100' : ''
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
