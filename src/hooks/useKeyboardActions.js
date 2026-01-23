import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteElement } from "../store/editorSlice";

export function useKeyboardActions() {
  const dispatch = useDispatch();
  const selectedId = useSelector((state) => state.editor.selectedId);

  useEffect(() => {
    const handleKeyDown = (e) => {
      const isTyping =
        e.target.tagName === "INPUT" || e.target.tagName === "TEXTAREA";
      if (isTyping) {
        return;
      }

      if (e.key === "Delete" || e.key === "Backspace") {
        if (selectedId) {
          dispatch(deleteElement(selectedId));
        }
      }
      //複製邏輯
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedId]);
}
