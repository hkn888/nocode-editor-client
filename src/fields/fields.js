import { updateElement } from "@/src/store/editorSlice";
import { FIELD_COMPONENTS } from "./FieldLibrary";

import { useState } from "react";

export default function Fields({
  targetElement,
  fieldType,
  selectedId,
  dispatch,
}) {
  const [localValue, setLocalValue] = useState(
    targetElement.props[fieldType.key] || ""
  );

  const handleConfirm = (valuePassed) => {
    const finalValue = valuePassed !== undefined ? valuePassed : localValue;

    dispatch(
      updateElement({
        id: selectedId,
        propKey: fieldType.key,
        propValue: finalValue,
      })
    );
  };
  const Field = FIELD_COMPONENTS[fieldType.type];
  console.log("Current Field Type:", fieldType.type, "Found Component:", Field);
  return (
    <div key={fieldType.id} className="p-1">
      <label>{fieldType.label}</label>
      {Field && (
        <Field
          localValue={localValue}
          fieldType={fieldType}
          setValue={setLocalValue}
          onConfirm={handleConfirm}
        />
      )}
    </div>
  );
}
