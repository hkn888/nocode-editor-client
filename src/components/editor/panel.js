import { useSelector, useDispatch } from "react-redux";
import Fields from "./fields";

const paragraphFields = [
  { key: "color", label: "文字顏色", type: "input" },
  { key: "backgroundColor", label: "背景顏色", type: "input" },
  { key: "text", label: "文字內容", type: "textarea" },
];

const imageFields = [
  { key: "src", label: "圖片網址", type: "input" },
  {
    key: "objectFit",
    label: "裁切模式",
    type: "dropdown",
    options: ["cover", "contain"],
  },
  {
    key: "aspectRatio",
    label: "比例",
    type: "composite-input",
    options: ["ratioW", "ratioH"],
    span: " : ",
  },
  { key: "opacity", label: "透明度", type: "input" },
];

export default function Panel() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.editor.selectedId);
  const elements = useSelector((state) => state.editor.elements);
  const targetElement = elements.find((element) => element.id == selectedId);

  if (!targetElement) {
    return null;
  }

  return (
    <div className="w-32 bg-gray-200 border-l border-gray-500">
      panel
      {selectedId && targetElement.type === "paragraph"
        ? paragraphFields.map((f) => (
            <Fields
              key={`${selectedId}-${f.key}`}
              f={f}
              targetElement={targetElement}
              dispatch={dispatch}
              selectedId={selectedId}
            />
          ))
        : imageFields.map((f) => (
            <Fields
              key={`${selectedId}-${f.key}`}
              f={f}
              targetElement={targetElement}
              dispatch={dispatch}
              selectedId={selectedId}
            />
          ))}
    </div>
  );
}
