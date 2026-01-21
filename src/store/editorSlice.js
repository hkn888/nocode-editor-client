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
  },
});

export const { addElement, setSelectedId, switchElement, updateElement } =
  editorSlice.actions;
export default editorSlice.reducer;
