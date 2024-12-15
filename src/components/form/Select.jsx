import { Check } from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

const Select = ({ options, labelIcon, label, isRequired, value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(value || null); // Use the `value` prop to initialize selectedOption
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleOptionClick = (option) => {
    setSelectedOption(option);  // Update the selected option locally
    onChange(option.value);  // Call the `onChange` prop to update the parent component
    setIsOpen(false);
  };

  return (
    <div className="w-full" ref={dropdownRef}>
      {label && (
        <label className="text-md font-semibold inline-flex items-center gap-2">
          {labelIcon && <span>{labelIcon}</span>}
          {label}
        </label>
      )}
      {isRequired && <span className="text-red-500 mx-1">*</span>}
      <button
        className="w-full block px-4 py-2 text-left bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        onClick={toggleDropdown}>
        <span className="block truncate text-right">
          {selectedOption ? selectedOption.label : "اختر الخيار"}
        </span>
        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"></span>
      </button>

      {isOpen && (
        <ul className="absolute z-10 w-64 py-1 mt-1 overflow-auto bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none">
          {options.map((option) => (
            <li
              key={option.value}
              className="relative px-4 py-2 text-gray-900 cursor-pointer select-none hover:bg-blue-100"
              onClick={() => handleOptionClick(option)}>
              <span className="block truncate">{option.label}</span>
              {selectedOption && selectedOption.value === option.value && (
                <span className="absolute inset-y-0 left-4 flex items-center pr-3 text-blue-600">
                  <Check className="size-5 text-sky-600" />
                </span>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Select;
