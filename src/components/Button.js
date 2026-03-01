import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";

export default function Button({ label, type, onAdd }) {
  const buttonRef = useRef(null);

  useEffect(() => {
    const el = buttonRef.current;
    if (!el) return;
    return draggable({
      element: el,

      getInitialData: () => ({ type, isSidebarItem: true }),
    });
  }, []);

  return (
    <button
      className="w-8 h-8 mb-2 bg-blue-300 text-white"
      onClick={() => onAdd(type)}
      ref={buttonRef}
    >
      {label}
    </button>
  );
}
