interface FormFieldProps {
  name: string;
  label?: string;
  placeholder?: string;
  type?: string;
  as?: "input" | "textarea";
  value: string | number;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  error?: string;
  className?: string;
  required?: boolean;
}
function FormField({
  name,
  label,
  placeholder,
  type = "text",
  as = "input",
  value,
  onChange,
  error,
  className = "",
  required = false,
}: FormFieldProps) {
  const inputClassName = `w-full p-2 border rounded ${
    error ? "border-red-500" : "border-gray-300"
  } ${className}`;
  const InputComponent = as === "textarea" ? "textarea" : "input";
  return (
    <div>
     {label && (
        <label className="block text-sm font-medium mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <InputComponent
        name={name}
        type={as === "input" ? type : undefined}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={inputClassName}
        required={required}
      />
      {error && (
        <p className="text-red-500 text-sm mt-1">{error}</p>
      )}
    </div>
  );
}

export default FormField;
