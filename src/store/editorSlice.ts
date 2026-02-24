import { createSlice } from "@reduxjs/toolkit";
import { EditorElement } from "../editor/sidebar/blueprint/types";

const getAllDescendantIds = (id, elements, idCollector) => {
  idCollector.push(id);
  const currentElement = elements[id];
  if (!currentElement || !currentElement.children) {
    return;
  }
  currentElement.children.forEach((childId) => {
    getAllDescendantIds(childId, elements, idCollector);
  });
};

interface EditorState {
  rootId: string;
  elements: Record<string, EditorElement>;
  selectedId: string | null;
}

const initialState: EditorState = {
  rootId: "canvas-root",
  elements: {
    "canvas-root": {
      id: "canvas-root",
      type: "canvas",
      parentId: null,
      children: ["box-1", "text-1"],
      props: { backgroundColor: "#ffffff" },
    },

    "box-1": {
      id: "box-1",
      type: "container",
      parentId: "canvas-root",
      children: ["pp-1"],
      props: { minHeight: "100px" },
    },

    "text-1": {
      id: "text-1",
      type: "paragraph",
      parentId: "canvas-root",
      children: [],
      props: { text: "這是第一層的文字" },
    },

    "pp-1": {
      id: "pp-1",
      type: "paragraph",
      parentId: "box-1",
      children: [],
      props: { color: "#000000", text: "這是第二層的文字" },
    },
  },

  selectedId: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
  reducers: {
    addElement: (state, action) => {
      const newElement = action.payload;
      state.elements[newElement.id] = newElement;
      const parentId = newElement.parentId;

      if (parentId && state.elements[parentId]) {
        state.elements[parentId].children.push(newElement.id);
      }
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },

    updateElement: (state, action) => {
      const { id, propKey, propValue } = action.payload;
      const elements = state.elements;
      if (elements[id]) {
        elements[id].props[propKey] = propValue;
      }
    },
    deleteElement: (state, action) => {
      const targetId = action.payload;
      const elements = state.elements;
      const parentId = elements[targetId].parentId;
      const idsToDelete = [];

      getAllDescendantIds(targetId, elements, idsToDelete);

      if (parentId) {
        elements[parentId].children = elements[parentId].children.filter(
          (id) => id !== targetId
        );
      }

      idsToDelete.forEach((id) => {
        delete elements[id];
      });

      if (state.selectedId === targetId) {
        state.selectedId = null;
      }
    },
    copyElement: (state, action) => {
      const targetId = action.payload;
      const elements = state.elements;
      const targetParentId = elements[targetId].parentId;
      const idsToCopy = [];

      getAllDescendantIds(targetId, elements, idsToCopy);

      const idMap = {};
      idsToCopy.forEach((oldId) => {
        idMap[oldId] = crypto.randomUUID();
      });

      idsToCopy.forEach((oldId) => {
        const original = elements[oldId];
        if (!original) {
          return;
        }

        const deepCopy = JSON.parse(JSON.stringify(original));
        const newId = idMap[oldId];
        deepCopy.id = newId;

        if (deepCopy.parentId && idMap[deepCopy.parentId]) {
          deepCopy.parentId = idMap[deepCopy.parentId];
        }

        if (deepCopy.children && deepCopy.children.length > 0) {
          deepCopy.children = deepCopy.children.map(
            (oldChildId) => idMap[oldChildId]
          );
        }

        elements[newId] = deepCopy;
      });

      if (targetParentId && elements[targetParentId]) {
        const parent = elements[targetParentId];
        const index = parent.children.indexOf(targetId);
        const idCopied = idMap[targetId];
        parent.children.splice(index + 1, 0, idCopied);
      }
    },
    reorderElement: (state, action) => {
      const { oldIndex, newIndex } = action.payload;
      if (oldIndex === undefined || newIndex === undefined) return;
      if (oldIndex == -1 && newIndex == -1) return;
      const components = state.elements;
      const [movedItem] = components.splice(oldIndex, 1);
      components.splice(newIndex, 0, movedItem);
    },
  },
});

export const {
  addElement,
  setSelectedId,
  updateElement,
  deleteElement,
  copyElement,
  reorderElement,
} = editorSlice.actions;
export default editorSlice.reducer;
