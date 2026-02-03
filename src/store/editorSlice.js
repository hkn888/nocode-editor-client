import { createSlice } from "@reduxjs/toolkit";

const editorSlice = createSlice({
  name: "editor",
  initialState: {
    elements: [
      // {
      //   id: "p1",
      //   type: "paragraph",
      //   props: { text: "我是第一層的文字", color: "black" },
      // },
      // {
      //   id: "c1",
      //   type: "container",
      //   props: { backgroundColor: "#f9f9f9" },
      //   children: [
      //     {
      //       id: "p2",
      //       type: "paragraph",
      //       props: { text: "我是第二層（容器內）的文字", color: "blue" },
      //     },
      //     {
      //       id: "c2",
      //       type: "container",
      //       props: { backgroundColor: "#e0f7fa" },
      //       children: [
      //         {
      //           id: "p3",
      //           type: "paragraph",
      //           props: { text: "我是第三層（孫子）的文字", color: "red" },
      //         },
      //       ],
      //     },
      //   ],
      // },
    ],
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
  switchElement,
  updateElement,
  deleteElement,
  copyElement,
  reorderElement,
} = editorSlice.actions;
export default editorSlice.reducer;
