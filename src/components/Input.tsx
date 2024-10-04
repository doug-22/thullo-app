interface IInput {
  name: string;
  placeholder: string;
  type?: 'password' | 'text';
  value?: string;
}

export default function Input({
  name,
  placeholder,
  type = 'text',
  value,
}: IInput) {
  return (
    <input
      className="w-full rounded-lg border border-[#E0E0E0] p-2 shadow-md focus:outline focus:outline-[#2F80ED]"
      type={type}
      name={name}
      placeholder={placeholder}
      value={value}
    />
  );
}
