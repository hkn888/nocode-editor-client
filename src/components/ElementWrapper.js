import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { combine } from "@atlaskit/pragmatic-drag-and-drop/combine";

export default function ElementWrapper({
  id,
  children,
  isSelected,
  handleSelect,
  handleDelete,
  handleCopy,
  handleMoveUp,
  handleMoveDown,
}) {
  const ref = useRef(null);
  const [dragging, setDragging] = useState(false);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  const baseClass = "wf flex-shrink-0 cursor-pointer flex transition-all";
  const selectedClass = isSelected
    ? "ring-2 ring-blue-300 border-blue-500"
    : "border border-transparent";
  const draggingClass = dragging ? "opacity-30" : "opacity-100";

  //測試 drop target 用
  const dragOverClass = isDraggedOver
    ? "border-t-4 border-t-red-500 bg-red-50/50"
    : "border-t-4 border-t-transparent";

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
        onDragEnter: () => setIsDraggedOver(true),
        onDragLeave: () => setIsDraggedOver(false),
        onDrop: () => setIsDraggedOver(false),
        getData: () => ({ id }),
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
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveUp();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveDown();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            ↓
          </button>
        </>
      )}
    </div>
  );
}
