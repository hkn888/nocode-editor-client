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

  const renderInput = () => {
    switch (f.type) {
      case "input":
        return (
          <input
            value={localValue}
            className="border border-gray-500 w-full"
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
            type="text"
          />
        );
      case "textarea":
        return (
          <textarea
            className="border border-gray-500 w-full"
            value={localValue}
            onChange={(e) => setLocalValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
          ></textarea>
        );
      case "dropdown":
        return (
          <select
            value={localValue}
            className="border border-gray-500 w-full bg-white"
            onChange={(e) => {
              const newValue = e.target.value;
              setLocalValue(newValue);
              handleConfirm(newValue);
            }}
          >
            {f.options.map((o) => (
              <option value={o} key={o}>
                {o}
              </option>
            ))}
          </select>
        );
      case "composite-input": {
        //16 / 9
        const parts = localValue ? localValue.split("/") : ["1", "1"];
        const w = parts[0]?.trim() || "";
        const h = parts[1]?.trim() || "";

        const updateRatio = (newRat, index) => {
          const updatedParts = [...parts];
          updatedParts[index] = newRat;
          const combined = updatedParts.join(" / ");
          setLocalValue(combined);
        };

        return (
          <div>
            <input
              value={w}
              className="border border-gray-500 w-full"
              onChange={(e) => updateRatio(e.target.value, 0)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              type="text"
            />
            <span>{f.span}</span>
            <input
              value={h}
              className="border border-gray-500 w-full"
              onChange={(e) => updateRatio(e.target.value, 1)}
              onKeyDown={(e) => e.key === "Enter" && handleConfirm()}
              type="text"
            />
          </div>
        );
      }
    }
  };

  return (
    <div key={f.id} className="p-1">
      <label>{f.label}</label>
      {renderInput()}
    </div>
  );
}
