export default function CompositeInput({
  localValue,
  setValue,
  fieldType,
  onConfirm,
}) {
  const parts = localValue ? localValue.split("/") : ["1", "1"];
  const w = parts[0]?.trim() || "";
  const h = parts[1]?.trim() || "";

  const updateRatio = (newRat, index) => {
    const updatedParts = [...parts];
    updatedParts[index] = newRat;
    const combinedParts = updatedParts.join(" / ");
    setValue(combinedParts);
  };

  return (
    <div>
      <input
        className="border border-gray-500 w-full"
        value={w}
        onChange={(e) => updateRatio(e.target.value, 0)}
        onKeyDown={(e) => e.key === "Enter" && onConfirm()}
        type="text"
      />
      <span>{fieldType.span}</span>
      <input
        className="border border-gray-500 w-full"
        value={h}
        onChange={(e) => updateRatio(e.target.value, 1)}
        onKeyDown={(e) => e.key === "Enter" && onConfirm()}
        type="text"
      />
    </div>
  );
}
