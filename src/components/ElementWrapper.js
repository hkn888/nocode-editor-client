import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import {
  attachClosestEdge,
  extractClosestEdge,
} from "@atlaskit/pragmatic-drag-and-drop-hitbox/closest-edge";

import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export default function ElementWrapper({
  id,
  children,
  isSelected,
  handleSelect,
  handleDelete,
  handleCopy,
}) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);
  const [closestEdge, setClosestEdge] = useState(null);

  const baseClass = "wf flex-shrink-0 cursor-pointer flex transition-all";
  const selectedClass = isSelected
    ? "ring-2 ring-blue-300 border-blue-500"
    : "border border-transparent";
  const draggingClass = dragging ? "opacity-30" : "opacity-100";

  const dragOverClass =
    isDraggedOver && closestEdge === "top"
      ? "relative before:content-[''] before:absolute before:top-[-2px] before:left-0 before:w-full before:h-[4px] before:bg-blue-500 before:z-10"
      : isDraggedOver && closestEdge === "bottom"
      ? "relative after:content-[''] after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[4px] after:bg-blue-500 after:z-10"
      : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return combine(
      draggable({
        element: el,
        onDragStart: () => setDragging(true),
        onDrop: () => setDragging(false),
        getInitialData: () => ({ id }),
      }),
      dropTargetForElements({
        element: el,
        onDrag: ({ self }) => {
          setIsDraggedOver(true);
          setClosestEdge(extractClosestEdge(self.data));
        },
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
        getData: ({ input, element }) => {
          const data = { id };
          return attachClosestEdge(data, {
            input,
            element,
            allowedEdges: ["top", "bottom"],
          });
        },
      })
    );
  }, []);
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        handleSelect();
      }}
      className={`${baseClass} ${selectedClass} ${draggingClass} ${dragOverClass}`}
    >
      {children}
      {isSelected && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            x
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            c
          </button>
        </>
      )}
    </div>
  );
}
