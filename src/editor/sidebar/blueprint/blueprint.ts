import { EditorElement, ElementBlueprint } from "./types";

export const ELEMENT_BLUEPRINTS: ElementBlueprint = {
  paragraph: {
    type: "paragraph",
    props: {
      color: "#ffffff",
      backgroundColor: "#000000",
      text: `預設文字`,
    },
  },
  image: {
    type: "image",
    props: {
      src: "https://picsum.photos/id/237/200/300",
      objectFit: "cover",
      aspectRatio: "16 / 9",
      opacity: "1",
    },
  },
};

export const createElementFromBluePrint = (type: string, index: number) => {
  const blueprint = ELEMENT_BLUEPRINTS[type];
  if (!blueprint) return null;

  const newElement = {
    ...blueprint,
    props: { ...blueprint.props },
    id:
      typeof crypto.randomUUID === "function"
        ? crypto.randomUUID()
        : String(Date.now()),
  };

  if (type === "paragraph") {
    newElement.props.text = `預設文字 元件${index + 1}`;
  }

  return newElement;
};
