export interface EditorElement {
  id: string;
  type: "paragraph" | "image" | "container";
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
  children?: EditorElement[];
}

export type ElementBlueprint = {
  [key: string]: Omit<EditorElement, "id">;
};
