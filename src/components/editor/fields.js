import { updateElement } from "@/src/store/editorSlice";

import { useState } from "react";

export default function Fields({ targetElement, f, selectedId, dispatch }) {
  const [localValue, setLocalValue] = useState(
    targetElement.props[f.key] || ""
  );

  const handleConfirm = () => {
    dispatch(
      updateElement({
        id: selectedId,
        propKey: f.key,
        propValue: localValue,
      })
    );
  };

  return (
    <div key={f.id} className="p-1">
      <label>{f.label}</label>
      {f.type === "input" ? (
        <input
          value={localValue}
          className="border border-gray-500 w-full"
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          type="text"
        />
      ) : (
        <textarea
          className="border border-gray-500 w-full"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
        ></textarea>
      )}
    </div>
  );
}
