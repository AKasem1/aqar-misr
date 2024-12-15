'use client'

import React, { useEffect, useRef, ChangeEvent } from 'react'


const ExpandingTextarea = ({
  placeholder,
  className,
  value,
  onChange,
  label,
  labelIcon,
  isRequired,
  ...props
}) => {
  const textareaRef = useRef(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = 'auto'
      textarea.style.height = `${textarea.scrollHeight}px`
    }
  }

  useEffect(() => {
    adjustHeight()
  }, [value])

  const handleInput = function(e) {
    adjustHeight()
    onChange?.(e.target.value)
  }

  return (
    <div className="flex flex-col gap-2">
      {label && (
        <label className="text-md font-semibold inline-flex items-center gap-2">
          {labelIcon && <span>{labelIcon}</span>}
          {label}
          {isRequired && <span className="text-red-500 mx-1">*</span>}
        </label>
      )}
      <textarea
        ref={textareaRef}
        className={`w-full min-h-[100px] p-2 border rounded-md resize-none
                    focus:outline-none focus:ring-2 focus:ring-teal-900
                    ${className || ''}`}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        {...props}
      />
    </div>
  )
}

export default ExpandingTextarea

