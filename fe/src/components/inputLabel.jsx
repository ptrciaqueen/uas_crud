"use client";

const InputLabel = ({
  label,
  type,
  name,
  value,
  onChange,
  className,
  placeholder,
  classNameDiv,
  disabled,
  maxLength,
  classNameLabel,
}) => {
  return label ? (
    <div className={`${classNameDiv} flex flex-col`}>
      <label
        className={`text-[#C91F3B] ml-2 mb-1 font-medium ${classNameLabel}`}
      >
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className={`p-3 bg-[#F1F1F1] focus:outline-none ${className}`}
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        maxLength={maxLength}
      />
    </div>
  ) : (
    <input
      placeholder={placeholder}
      type={type}
      className={`p-3 bg-[#F1F1F1] focus:outline-none ${className}`}
      onChange={onChange}
      name={name}
      value={value}
      disabled={disabled}
      maxLength={maxLength}
    />
  );
};

export default InputLabel;
