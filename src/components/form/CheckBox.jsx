import React from "react";
import { cn } from "@/lib/utils";
import { Check } from "lucide-react";

const CheckBox = ({
  label,
  labelIcon,
  errorMsg,
  onChange,
  value,
  checked,
  className,
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = () => {
    const newCheckedState = !isChecked;
    setIsChecked(newCheckedState);
    onChange(newCheckedState);
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <label className="text-md font-semibold inline-flex items-center gap-2">
        {labelIcon && <span>{labelIcon}</span>}
        {label}
      </label>
      {errorMsg && <p className="text-red-500 text-sm">{errorMsg}</p>}
      <input
        type="checkbox"
        className="hidden"
        value={value}
        checked={isChecked}
        onChange={handleChange}
      />
      <div
        onClick={handleChange} 
        className={cn(
          "size-5 rounded border-2 border-gray-300 cursor-pointer transition-all duration-200",
          isChecked && "bg-teal-600 border-teal-600"
        )}
      >
        {isChecked && <Check className="size-4 text-white" />}
      </div>
    </div>
  );
};

export default CheckBox;
