import { ElementBlueprint } from "./types";
import { generateId } from "@/src/utils/uuid";

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
  container: {
    type: "container",
    props: {
      backgroundColor: "#000000",
      minHeight: "50px",
    },
  },
};

export const createElementFromBluePrint = (
  type: keyof typeof ELEMENT_BLUEPRINTS,
  parentId: string
) => {
  const blueprint = ELEMENT_BLUEPRINTS[type];
  if (!blueprint) return null;

  const id = generateId();

  const newElement = {
    ...blueprint,
    id,
    parentId,
    children: [],
    props: { ...blueprint.props },
  };

  return newElement;
};
