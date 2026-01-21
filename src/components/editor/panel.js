import { useSelector, useDispatch } from "react-redux";
import Fields from "./fields";

const fields = [
  { key: "color", label: "文字顏色", type: "input" },
  { key: "backgroundColor", label: "背景顏色", type: "input" },
  { key: "text", label: "文字內容", type: "textarea" },
];

export default function Panel() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.editor.selectedId);
  const elements = useSelector((state) => state.editor.elements);
  const targetElement = elements.find((element) => element.id == selectedId);
  return (
    <div className="w-32 bg-gray-200 border-l border-gray-500">
      panel
      {selectedId &&
        fields.map((f) => (
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
