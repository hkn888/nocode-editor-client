import {
  deleteElement,
  setSelectedId,
  switchElement,
  copyElement,
  reorderElement,
} from "@/src/store/editorSlice";

import ElementWrapper from "@/src/components/ElementWrapper";

import { CANVAS_ELEMENTS } from "./canvasLibrary";
import { useSelector, useDispatch } from "react-redux";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

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
  // const handleReorder = (oldIndex, newIndex) => {
  //   dispatch(reorderElement({ oldIndex, newIndex }));
  // };

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;
        const sourceId = source.data.id;
        const targetId = destination.data.id;
        if (sourceId === targetId) return;

        const oldIndex = elements.findIndex((el) => el.id === sourceId);
        const targetIndex = elements.findIndex((el) => el.id === targetId);
        const edge = extractClosestEdge(destination.data);
        let newIndex = targetIndex;
        if (edge === "bottom") {
          newIndex = targetIndex + 1;
        }
        if (oldIndex === newIndex || oldIndex === newIndex - 1) {
          return;
        }
        const finalIndex = oldIndex < newIndex ? newIndex - 1 : newIndex;

        if (oldIndex !== -1 && newIndex !== -1) {
          console.log(`測試排序: 從 ${oldIndex} 到 ${newIndex}`);
          dispatch(reorderElement({ oldIndex, newIndex: finalIndex }));
          console.log(
            "Redux 更新後的資料順序:",
            elements.map((el) => el.id)
          );
        }
      },
    });
  }, [elements]);

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
