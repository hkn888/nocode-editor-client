import { addElement } from "@/src/store/editorSlice";
import { useDispatch, useSelector } from "react-redux";

const componentTypes = [
  { type: "paragraph", label: "T" },
  { type: "image", label: "i" },
];

export default function Sidebar() {
  const dispatch = useDispatch();

  const elements = useSelector((state) => state.editor.elements);
  const handleAdd = (type) => {
    const paragraph = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      type: "paragraph",
      props: {
        color: "#ffffff",
        backgroundColor: "#000000",
        text: `預設文字 元件${elements.length + 1}`,
      },
    };
    const image = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      type: "image",
      props: {
        src: "https://picsum.photos/id/237/200/300",
        objectFit: "cover",
        aspectRatio: "16 / 9",
        opacity: "1",
      },
    };
    if (type === "paragraph") {
      dispatch(addElement(paragraph));
    }
    if (type === "image") {
      dispatch(addElement(image));
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
