interface IInput {
  label: string;
  name: string;
  placeholder: string;
  type?: 'password' | 'text';
  value?: string;
  onChange?: (e: string) => void;
}

export default function Input({
  label,
  name,
  placeholder,
  type = 'text',
  value,
  onChange,
}: IInput) {
  return (
    <div>
      <label className="pl-1 text-sm font-semibold text-gray-600">
        {label}
      </label>
      <input
        className="w-full rounded-lg border border-[#E0E0E0] p-2 shadow-md focus:outline focus:outline-[#2F80ED]"
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={(e) => (onChange ? onChange(e.target.value) : {})}
      />
    </div>
  );
}
