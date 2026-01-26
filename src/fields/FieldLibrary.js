import compositeInput from "../components/CompositeInput";

export const FIELD_COMPONENTS = {
  input: ({ localValue, setValue, onConfirm }) => (
    <input
      className="border border-gray-500 w-full"
      value={localValue}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onConfirm()}
    />
  ),
  textarea: ({ localValue, setValue, onConfirm }) => (
    <textarea
      className="border border-gray-500 w-full"
      value={localValue}
      onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => e.key === "Enter" && onConfirm()}
    ></textarea>
  ),
  dropdown: ({ localValue, setValue, onConfirm, fieldType }) => (
    <select
      className="border border-gray-500 w-full bg-white"
      value={localValue}
      onChange={(e) => {
        const newValue = e.target.value;
        setValue(newValue);
        onConfirm(newValue);
      }}
    >
      {fieldType.options.map((option) => (
        <option value={option} key={option}>
          {option}
        </option>
      ))}
    </select>
  ),
  compositeInput: compositeInput,
};
