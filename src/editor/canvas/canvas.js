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
import { useEffect, useRef, useState } from "react";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";
import { extractClosestEdge } from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

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
  const [isOver, setIsOver] = useState(false);
  const isEmptyCanvas = rootChildren.length === 0;

  useEffect(() => {
    const el = canvasRef.current;
    if (!el) return;
    return combine(
      dropTargetForElements({
        element: el,
        onDragEnter: () => setIsOver(true),
        onDragLeave: () => setIsOver(false),
        onDrop: () => setIsOver(false),
        getData: () => ({
          id: rootId,
          type: "canvas",
          isNesting: true,
          edge: null,
        }),
      }),

      monitorForElements({
        onDrop({ source, location }) {
          const targets = location.current.dropTargets;
          if (targets.length === 0) return;

          console.log("targets", targets);

          const destination =
            targets.find((t) => t.data.type !== "canvas") ?? targets[0];
          const {
            id: targetId,
            type: targetType,
            isNesting,
          } = destination.data;

          const destinationType = destination.data.type;

          const edge = extractClosestEdge(destination.data);
          console.log("目標類型:", destinationType, "目標ID:", targetId);
          console.log({
            targetId: destination.data.id,
            isNesting: destination.data.isNesting,
            edge: extractClosestEdge(destination.data),
          });

          if (source.data.isSidebarItem) {
            dispatch(
              addNewElementAt({
                type: source.data.type,
                targetId,
                edge: destinationType === "canvas" ? null : edge,
                isNesting: isNesting,
              })
            );
            return;
          }

          const sourceId = source.data.id;
          if (sourceId === targetId) return;
          dispatch(reorderElement({ sourceId, targetId, edge, isNesting }));
        },
      })
    );
  }, [rootId]);

  return (
    <div
      ref={canvasRef}
      className="bg-gray-100 flex-grow relative"
      onClick={() => setId(null)}
    >
      canvas
      {isEmptyCanvas && isOver && (
        <div className="absolute top-10 left-4 right-4 h-[2px] bg-blue-500 z-50 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
      )}
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
