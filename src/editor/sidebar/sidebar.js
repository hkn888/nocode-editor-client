import { addElement } from "@/src/store/editorSlice";
import { useDispatch, useSelector } from "react-redux";
import { createElementFromBluePrint } from "./blueprint/blueprint";

import Button from "@/src/components/Button";

const componentTypes = [
  { type: "paragraph", label: "T" },
  { type: "image", label: "i" },
  { type: "container", label: "B" },
];

export default function Sidebar() {
  const dispatch = useDispatch();

  const rootId = useSelector((state) => state.editor.rootId);
  const elements = useSelector((state) => state.editor.elements);

  const handleAdd = (type) => {
    const elementToAdd = createElementFromBluePrint(type, rootId);
    if (elementToAdd) {
      dispatch(addElement(elementToAdd));
    } else {
      console.warn(`[Sidebar] 無法建立元件，因為找不到類型：${type}`);
    }
  };
  return (
    <div className="w-16 bg-gray-200 border-r border-gray-500 flex flex-col">
      sidebar
      {componentTypes.map((comp) => (
        <Button
          key={comp.type}
          label={comp.label}
          type={comp.type}
          onAdd={handleAdd}
        />
      ))}
    </div>
  );
}
