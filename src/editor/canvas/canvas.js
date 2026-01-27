import {
  deleteElement,
  setSelectedId,
  switchElement,
  copyElement,
} from "@/src/store/editorSlice";

import ElementWrapper from "@/src/components/ElementWrapper";

import { CANVAS_ELEMENTS } from "./canvasLibrary";
import { useSelector, useDispatch } from "react-redux";

export default function Canvas() {
  const dispatch = useDispatch();

  const elements = useSelector((state) => state.editor.elements);
  const selectedId = useSelector((state) => state.editor.selectedId);
  const setId = (id) => dispatch(setSelectedId(id));
  const switchPosition = (index, direction) => {
    dispatch(switchElement({ index, direction }));
  };
  const deleteComponent = (id) => {
    dispatch(deleteElement(id));
  };
  const handleCopy = (id) => {
    dispatch(copyElement(id));
  };

  return (
    <div className="bg-gray-100 flex-grow" onClick={() => setId(null)}>
      canvas
      {elements.map((c, index) => {
        const RenderComponent = CANVAS_ELEMENTS[c.type];
        const isSelected = selectedId === c.id;
        if (!RenderComponent) {
          return <div key={c.id}>未知元件類型: {c.type}</div>;
        }
        return (
          <ElementWrapper
            key={c.id}
            id={c.id}
            isSelected={isSelected}
            handleSelect={() => setId(c.id)}
            handleDelete={() => deleteComponent(selectedId)}
            handleCopy={() => handleCopy(selectedId)}
            handleMoveUp={() => switchPosition(index, "up")}
            handleMoveDown={() => switchPosition(index, "down")}
          >
            <RenderComponent c={c} />
          </ElementWrapper>
        );
      })}
    </div>
  );
}
