import { ReactNode, ButtonHTMLAttributes } from 'react';

interface IButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  icon?: ReactNode;
  type?: 'button' | 'submit';
  variant?: 'primary' | 'secondary' | 'text';
  onClick?: () => void;
}

export default function Button({
  label,
  icon,
  variant = 'primary',
  onClick,
  type = 'button',
  ...props
}: IButton) {
  const bgColors = {
    primary: 'bg-[#2F80ED]',
    secondary: 'bg-gray-200',
    text: 'bg-transparent',
  };
  const labelColors = {
    primary: 'text-white',
    secondary: 'text-gray-600',
    text: 'text-gray-500',
  };
  const fontSize = {
    primary: 'text-base',
    secondary: 'text-base',
    text: 'text-base',
  };
  return (
    <button
      className={`${
        label ? 'min-w-32 min-h-[42px] max-h-[42px]' : 'min-w-9 min-h-9 max-h-9'
      }  p-1 scale-95 transition-all duration-200 ${
        bgColors[variant]
      } rounded-lg ${labelColors[variant]} ${fontSize[variant]} ${
        variant !== 'text'
          ? 'shadow-md hover:drop-shadow-lg hover:scale-100'
          : ''
      } flex items-center justify-center gap-3 ${props.className}`}
      onClick={onClick}
      type={type}
    >
      {icon}
      {label}
    </button>
  );
}
