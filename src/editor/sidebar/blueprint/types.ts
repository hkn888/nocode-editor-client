export interface EditorElement {
  id: string;
  type: "paragraph" | "image" | "container" | "canvas";
  props: {
    color?: string;
    backgroundColor?: string;
    text?: string;
    src?: string;
    objectFit?: string;
    aspectRatio?: string;
    opacity?: string;
    minHeight?: string;
  };
  parentId: string | null;
  children?: string[];
}

export type ElementBlueprint = {
  [key: string]: Omit<EditorElement, "id" | "parentId" | "children">;
};
