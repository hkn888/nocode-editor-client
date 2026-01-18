import { setSelectedId, switchElement } from "@/src/store/editorSlice";

import { useSelector, useDispatch } from "react-redux";

export default function Canvas() {
  const dispatch = useDispatch();

  const elements = useSelector((state) => state.editor.elements);
  const selectedId = useSelector((state) => state.editor.selectedId);
  const setId = (id) => dispatch(setSelectedId(id));
  const switchPosition = (index, direction) => {
    dispatch(switchElement({ index, direction }));
  };

  return (
    <div className="bg-gray-100 flex-grow" onClick={() => setId(null)}>
      canvas
      {elements.map((c, index) => {
        const isSelected = selectedId === c.id;

        return (
          <div
            key={c.id}
            id={c.id}
            onClick={(e) => {
              e.stopPropagation();
              setId(c.id);
            }}
            className={`cursor-pointer flex ${
              isSelected
                ? "ring-2 ring-blue-300 border-blue-500"
                : "border border-transparent"
            }`}
          >
            <p
              style={{
                backgroundColor: c.props.backgroundColor,
                color: c.props.color,
              }}
              className="flex-grow"
            >
              {c.props.text}
            </p>
            <button
              className="w-8 h-8 bg-gray-200 border border-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                switchPosition(index, "up");
              }}
            >
              ↑
            </button>
            <button
              className="w-8 h-8 bg-gray-200 border border-gray-500"
              onClick={(e) => {
                e.stopPropagation();
                switchPosition(index, "down");
              }}
            >
              ↓
            </button>
          </div>
        );
      })}
    </div>
  );
}
