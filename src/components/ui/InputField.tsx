interface InputProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  maxLength?: number;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
}

const InputField = ({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  maxLength,
  inputMode,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm font-medium text-gray-600 mb-1">
        {label}
      </label>
      <input
        type={type}
        name={name}
        required
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        maxLength={maxLength}
        inputMode={inputMode}
        className="rounded-xl border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-rose-300 focus:border-rose-400 outline-none transition-all"
      />
    </div>
  );
};

export default InputField