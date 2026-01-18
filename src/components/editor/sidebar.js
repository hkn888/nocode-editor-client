import { addElement } from "@/src/store/editorSlice";
import { useDispatch, useSelector } from "react-redux";

export default function Sidebar() {
  const dispatch = useDispatch();

  const elements = useSelector((state) => state.editor.elements);
  const handleAdd = () => {
    const newComp = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      type: "paragraph",
      props: {
        color: "#ffffff",
        backgroundColor: "#000000",
        text: `預設文字 元件${elements.length + 1}`,
      },
    };
    dispatch(addElement(newComp));
  };
  return (
    <div className="w-16 bg-gray-200 border-r border-gray-500">
      sidebar
      <button className="w-8 h-8 bg-blue-300" onClick={handleAdd}>
        T
      </button>
    </div>
  );
}
