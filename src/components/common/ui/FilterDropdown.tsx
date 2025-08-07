import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

type FilterDropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
  placeholder?: string;
  selectedValue?: string | null;
};

const FilterDropdown: React.FC<FilterDropdownProps> = ({
  options,
  onSelect,
  placeholder = "Filter by category",
  selectedValue = null,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState<string | null>(selectedValue);

  const handleSelect = (option: string) => {
    setSelected(option);
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex w-full justify-between rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {selected || placeholder}
          <ChevronDown className="ml-2 -mr-1 h-5 w-5" aria-hidden="true" />
        </button>
      </div>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <button
              className="text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
              onClick={() => handleSelect("")}
            >
              All Categories
            </button>
            {options.map((option) => (
              <button
                key={option}
                className={`text-gray-700 block w-full text-left px-4 py-2 text-sm hover:bg-gray-100 ${
                  selected === option ? "bg-gray-50 font-medium" : ""
                }`}
                onClick={() => handleSelect(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterDropdown;
