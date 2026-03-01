import {
  deleteElement,
  setSelectedId,
  copyElement,
  reorderElement,
  addNewElementAt,
} from "@/src/store/editorSlice";

import RecursiveRenderer from "./RecursiveRenderer";
import { useSelector, useDispatch } from "react-redux";

import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useEffect, useRef } from "react";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

export default function Canvas() {
  const dispatch = useDispatch();

  const rootId = useSelector((state) => state.editor.rootId);

  const rootChildren = useSelector(
    (state) => state.editor.elements[rootId]?.children ?? []
  );

  const selectedId = useSelector((state) => state.editor.selectedId);
  const setId = (id) => dispatch(setSelectedId(id));

  const handleDelete = (id) => {
    dispatch(deleteElement(id));
  };
  const handleCopy = (id) => {
    dispatch(copyElement(id));
  };

  const canvasRef = useRef(null);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;
        const sourceId = source.data.id;
        const targetId = destination.data.id;
        const edge = extractClosestEdge(destination.data);
        if (source.data.isSidebarItem) {
          dispatch(addNewElementAt({ type: source.data.type, targetId, edge }));
        }
        if (sourceId === targetId) return;
        dispatch(reorderElement({ sourceId, targetId, edge }));
      },
    });
  }, []);

  return (
    <div className="bg-gray-100 flex-grow" onClick={() => setId(null)}>
      canvas
      {rootChildren.map((id, index) => {
        return (
          <RecursiveRenderer
            key={id}
            id={id}
            index={index}
            selectedId={selectedId}
            handleSelect={setId}
            handleDelete={handleDelete}
            handleCopy={handleCopy}
          />
        );
      })}
    </div>
  );
}
