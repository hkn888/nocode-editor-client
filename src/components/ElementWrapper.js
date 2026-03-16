import React, { useEffect, useRef, useState } from "react";
import {
  draggable,
  dropTargetForElements,
} from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { useSelector } from "react-redux";
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
  const isContainer = useSelector(
    (state) => state.editor.elements[id]?.type === "container"
  );
  const isEmpty = useSelector(
    (state) => state.editor.elements[id]?.children?.length === 0
  );

  const showEmptyNestingLine = isContainer && isDraggedOver && !closestEdge;
  const showTopLine =
    isDraggedOver && !showEmptyNestingLine && closestEdge === "top";
  const showBottomLine =
    isDraggedOver && !showEmptyNestingLine && closestEdge === "bottom";

  const emptyContainerLineClass = showEmptyNestingLine
    ? "relative before:absolute before:top-1/2 before:left-4 before:right-4 before:h-[2px] before:bg-blue-500 before:z-20"
    : "";
  const baseClass =
    "wf flex-shrink-0 cursor-pointer flex transition-all relative";
  const selectedClass = isSelected
    ? "ring-2 ring-blue-300 border-blue-500"
    : "border border-transparent";
  const draggingClass = dragging ? "opacity-30" : "opacity-100";
  const edgeLineClass = showTopLine
    ? "before:absolute before:top-[-2px] before:left-0 before:w-full before:h-[2px] before:bg-blue-500 before:z-20"
    : showBottomLine
    ? "after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-blue-500 after:z-20"
    : "";

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    return combine(
      draggable({
        element: el,
        onDragStart: () => setDragging(true),
        onDragEnd: () => setDragging(false),
        getInitialData: () => ({ id }),
      }),
      dropTargetForElements({
        element: el,
        onDragEnter: ({ location }) => {
          const isInnermost = location.current.dropTargets[0]?.element === el;
          if (isInnermost) setIsDraggedOver(true);
        },
        onDrag: ({ self, location }) => {
          const isInnermost = location.current.dropTargets[0]?.element === el;
          if (isInnermost) {
            setIsDraggedOver(true);
            const edge = extractClosestEdge(self.data);
            setClosestEdge((prev) => (prev !== edge ? edge : prev));
          } else {
            setIsDraggedOver(false);
            setClosestEdge(null);
          }
        },
        onDragLeave: () => {
          setIsDraggedOver(false);
          setClosestEdge(null);
        },
        onDrop: () => {
          setIsDraggedOver(false);
          setClosestEdge(null);
        },
        getData: ({ input, element }) => {
          const rect = element.getBoundingClientRect();
          const EDGE_THRESHOLD = 24;
          const offsetY = input.clientY - rect.top;
          console.log({
            offsetY,
            rectHeight: rect.height,
            threshold: 60,
            isNearTop: offsetY < 60,
            isNearBottom: offsetY > rect.height - 60,
          });
          const isNearTop = offsetY < EDGE_THRESHOLD;
          const isNearBottom = offsetY > rect.height - EDGE_THRESHOLD;

          if (isNearTop) {
            return attachClosestEdge(
              { id, isNesting: false },
              {
                input,
                element,
                allowedEdges: ["top"],
              }
            );
          }

          if (isNearBottom) {
            return attachClosestEdge(
              { id, isNesting: false },
              {
                input,
                element,
                allowedEdges: ["bottom"],
              }
            );
          }

          if (isContainer) {
            return { id, isNesting: true };
          }

          return attachClosestEdge(
            { id, isNesting: false },
            {
              input,
              element,
              allowedEdges: ["top", "bottom"],
            }
          );
        },
      })
    );
  }, [id, isContainer]);
  return (
    <div
      ref={ref}
      onClick={(e) => {
        e.stopPropagation();
        handleSelect();
      }}
      className={`${baseClass} ${selectedClass} ${draggingClass} ${edgeLineClass} ${emptyContainerLineClass}`}
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
