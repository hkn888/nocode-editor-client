import { useSelector, useDispatch } from "react-redux";
import Fields from "../fields/fields";

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
    type: "compositeInput",
    options: ["ratioW", "ratioH"],
    span: " : ",
  },
  { key: "opacity", label: "透明度", type: "input" },
];

const containerFields = [
  { key: "minHeight", label: "最小高度", type: "input" },
];

const FIELDS_MAP = {
  paragraph: paragraphFields,
  image: imageFields,
  container: containerFields,
};

export default function Panel() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.editor.selectedId);
  const elements = useSelector((state) => state.editor.elements);

  const findTargetElement = (list) => {
    for (const element of list) {
      if (element.id == selectedId) {
        return element;
      }
      if (element.children && element.children.length > 0) {
        const found = findTargetElement(element.children);
        if (found) {
          return found;
        }
      }
    }
    return null;
  };

  const targetElement = findTargetElement(elements);

  if (!targetElement) {
    return null;
  }

  return (
    <div className="w-32 bg-gray-200 border-l border-gray-500">
      panel
      {FIELDS_MAP[targetElement.type].map((f) => (
        <Fields
          key={`${selectedId}-${f.key}`}
          fieldType={f}
          targetElement={targetElement}
          dispatch={dispatch}
          selectedId={selectedId}
        />
      ))}
    </div>
  );
}
