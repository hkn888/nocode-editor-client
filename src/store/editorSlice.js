import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    elements: [],
    selectedId: null,
  },
  reducers: {
    addElement: (state, action) => {
      state.elements.push(action.payload);
    },
    setSelectedId: (state, action) => {
      state.selectedId = action.payload;
    },
    switchElement: (state, action) => {
      const { index, direction } = action.payload;
      const components = state.elements;
      const lastComponent = components.length - 1;
      const targetIndex = direction === "up" ? index - 1 : index + 1;
      if (index === 0 && direction === "up") {
        return;
      }
      if (index === lastComponent && direction === "down") {
        return;
      }
      const temp = components[index];
      components[index] = components[targetIndex];
      components[targetIndex] = temp;
    },
    updateElement: (state, action) => {
      const { id, propKey, propValue } = action.payload;
      const targetElement = state.elements.find((element) => element.id === id);
      if (targetElement) {
        targetElement.props[propKey] = propValue;
      }
    },
    deleteElement: (state, action) => {
      const targetId = action.payload;
      if (targetId) {
        state.elements = state.elements.filter(
          (element) => element.id !== targetId
        );
        state.selectedId = null;
      }
    },
    copyElement: (state, action) => {
      const targetId = action.payload;
      if (targetId) {
        const targetElement = state.elements.find(
          (element) => element.id === targetId
        );
        const deepCopy = JSON.parse(JSON.stringify(targetElement));
        deepCopy.id = crypto.randomUUID ? crypto.randomUUID() : Date.now();
        state.elements.push(deepCopy);
      }
    },
  },
});

export const {
  addElement,
  setSelectedId,
  switchElement,
  updateElement,
  deleteElement,
  copyElement,
} = editorSlice.actions;
export default editorSlice.reducer;
