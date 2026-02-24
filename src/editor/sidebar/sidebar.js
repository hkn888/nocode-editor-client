import { addElement } from "@/src/store/editorSlice";
import { useDispatch, useSelector } from "react-redux";
import { createElementFromBluePrint } from "./blueprint/blueprint";

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
    const elementToAdd = createElementFromBluePrint(
      type,
      rootId,
      elements.length
    );
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
        <button
          key={comp.type}
          className="w-8 h-8 mb-2 bg-blue-300 text-white"
          onClick={() => handleAdd(comp.type)}
        >
          {comp.label}
        </button>
      ))}
    </div>
  );
}
