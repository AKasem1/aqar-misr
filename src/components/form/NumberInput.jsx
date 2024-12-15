import React from "react";
import PropTypes from "prop-types";
import { cn } from "@/lib/utils";

const NumberInput = ({
  label,
  labelIcon,
  placeholder,
  isRequired,
  onChange,
  errorMsg,
  value,
  dir,
  className,
  min,
  max,
}) => {
  return (
    <div dir={dir}>
      {label && <label className="text-md font-semibold inline-flex items-center gap-2">
        {labelIcon && <span>{labelIcon}</span>}
        {label}
      </label>}
      {isRequired && <span className="text-red-500 mx-1">*</span>}
      <input
        className={cn("w-full border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-teal-900 focus:bg-teal-50", className)}
        type="number"
        min={min || 0}
        max={max}
        placeholder={placeholder}
        required={isRequired}
        onChange={onChange}
        value={value}
      />
      {errorMsg && <p className="text-red-500 text-sm mt-1">{errorMsg}</p>}
    </div>
  );
};

export default NumberInput;

NumberInput.propTypes = {
  label: PropTypes.string,
  placeholder: PropTypes.string,
  isRequired: PropTypes.bool,
  onChange: PropTypes.func,
  errorMsg: PropTypes.string,
  value: PropTypes.string,
  type: PropTypes.string,
  dir: PropTypes.string,
};
