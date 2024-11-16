export default function FormField({
  label,
  type = "text",
  value,
  onChange,
  placeholder,
  required = false,
}) {
  const isTextArea = type === "textarea";
  return (
    <div>
      <label className="block text-gray-700">{label}</label>
      {isTextArea ? (
        <textarea
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg"
          required={required}
        ></textarea>
      ) : (
        <input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full px-4 py-2 border rounded-lg"
          required={required}
        />
      )}
    </div>
  );
}
