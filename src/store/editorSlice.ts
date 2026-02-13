import { createSlice } from "@reduxjs/toolkit";
import { EditorElement } from "../editor/sidebar/blueprint/types";

interface EditorState {
  elements: EditorElement[];
  selectedId: string | null;
}

const initialState: EditorState = {
  elements: [
    {
      id: "p1",
      type: "paragraph",
      props: { text: "我是第一層的文字", color: "black" },
    },
    {
      id: "c1",
      type: "container",
      props: { backgroundColor: "#f9f9f9" },
      children: [
        {
          id: "p2",
          type: "paragraph",
          props: { text: "我是第二層（容器內）的文字", color: "blue" },
        },
        {
          id: "c2",
          type: "container",
          props: { backgroundColor: "#e0f7fa", minHeight: "50px" },
          children: [
            {
              id: "p3",
              type: "paragraph",
              props: { text: "我是第三層（孫子）的文字", color: "red" },
            },
          ],
        },
      ],
    },
  ],
  selectedId: null,
};

const editorSlice = createSlice({
  name: "editor",
  initialState,
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
      const performUpdate = (list) => {
        for (const el of list) {
          if (el.id === id) {
            el.props[propKey] = propValue;
            return true;
          }
          if (el.children && el.children.length > 0) {
            const targetElement = performUpdate(el.children);
            if (targetElement) {
              return true;
            }
          }
        }
        return false;
      };
      performUpdate(state.elements);
    },
    deleteElement: (state, action) => {
      const targetId = action.payload;
      const performDelete = (list: EditorElement[], targetId: string) => {
        const result = list
          .filter((li) => li.id !== targetId)
          .map((li) => {
            if (li.children && li.children.length > 0) {
              return {
                ...li,
                children: performDelete(li.children, targetId),
              };
            }
            return li;
          });
        return result;
      };

      state.elements = performDelete(state.elements, targetId);
      state.selectedId = null;
    },
    copyElement: (state, action) => {
      const targetId = action.payload;

      const assignNewIds = (element) => {
        element.id = crypto.randomUUID
          ? crypto.randomUUID()
          : String(Date.now() + Math.random());

        if (element.children && element.children.length > 0) {
          for (const el of element.children) {
            assignNewIds(el);
          }
        }
      };

      const performCopy = (list) => {
        for (let i = 0; i < list.length; i++) {
          const el = list[i];
          if (el.id === targetId) {
            const deepCopy = JSON.parse(JSON.stringify(el));
            assignNewIds(deepCopy);
            list.splice(i + 1, 0, deepCopy);
            return true;
          }
          if (el.children && el.children.length > 0) {
            const found = performCopy(el.children);
            if (found) {
              return true;
            }
          }
        }
        return false;
      };
      performCopy(state.elements);
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

const extractElement = (nodes, targetId) => {
  let foundTarget = null;

  // 1. 先從當前這一層「過濾」掉目標
  const remainingNodes = nodes
    .filter((node) => {
      if (node.id === targetId) {
        foundTarget = node; // 抓到目標了
        return false; // 從剩餘清單中移除
      }
      return true;
    })
    .map((node) => {
      // 2. 如果沒抓到，且這個節點有小孩，就叫小孩去遞迴找
      if (node.children && node.children.length > 0) {
        const { list: updatedChildren, item: discoveredTarget } =
          extractElement(node.children, targetId);

        // 3. 如果小孩真的在更深層找到了目標
        if (discoveredTarget) {
          foundTarget = discoveredTarget;
          // 產生「新地址」，把更新後的小孩裝回去
          return { ...node, children: updatedChildren };
        }
      }
      // 如果這條路徑沒事，就原封不動回傳舊地址
      return node;
    });

  return { list: remainingNodes, item: foundTarget };
};
