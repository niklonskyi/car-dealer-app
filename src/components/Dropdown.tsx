'use client';

interface DropdownProps {
  label: string;
  options: { value: string | number; label: string }[];
  value: string | number | '';
  onChange: (value: string | number | '') => void;
}

const Dropdown: React.FC<DropdownProps> = ({ label, options, value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="mb-2 block text-lg font-semibold text-slate-50">{label}</label>
      <select
        className="block w-full cursor-pointer rounded-lg border-2 border-gray-300 bg-white p-3 text-neutral-950 shadow-md transition duration-200 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        value={value}
        onChange={(e) => onChange(e.target.value === '' ? '' : (e.target.value as string | number))}
      >
        <option value="" disabled className="text-neutral-950">
          Select {label.toLowerCase()}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value} className="text-neutral-950">
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
