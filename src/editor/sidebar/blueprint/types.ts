export interface EditorElement {
  id: string;
  type: "paragraph" | "image";
  props: {
    color?: string;
    backgroundColor?: string;
    text?: string;
    src?: string;
    objectFit?: string;
    aspectRatio?: string;
    opacity?: string;
  };
  children?: EditorElement[];
}

export type ElementBlueprint = {
  [key: string]: Omit<EditorElement, "id">;
};
