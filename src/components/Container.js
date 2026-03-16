import React, { useEffect, useRef } from "react";
import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function Container({ c, renderRow }) {
  const containerRef = useRef(null);

  return (
    <div
      ref={containerRef}
      style={{
        border: "1px dashed #ccc",
        padding: "20px",
        minHeight: c.props.minHeight || "50px",
        backgroundColor: c.props.backgroundColor,
      }}
      className="flex-grow w-full"
    >
      {c.children &&
        c.children.map((childId, index) => renderRow(childId, index))}
    </div>
  );
}
