import { useSelector } from "react-redux";
import ElementWrapper from "@/src/components/ElementWrapper";
import { CANVAS_ELEMENTS } from "./canvasLibrary";

export default function RecursiveRenderer({
  id,
  index,
  selectedId,
  handleSelect,
  handleDelete,
  handleCopy,
}) {
  const element = useSelector((state) => state.editor.elements[id]);

  if (!element) {
    return null;
  }

  const RenderComponent = CANVAS_ELEMENTS[element.type];

  const renderRow = (childId, childIndex) => (
    <RecursiveRenderer
      key={childId}
      id={childId}
      index={childIndex}
      selectedId={selectedId}
      handleSelect={handleSelect}
      handleDelete={handleDelete}
      handleCopy={handleCopy}
    />
  );

  const isSelected = element.id === selectedId;

  if (!RenderComponent) return null;
  return (
    <ElementWrapper
      key={id}
      id={id}
      isSelected={isSelected}
      handleSelect={() => handleSelect(element.id)}
      handleDelete={() => handleDelete(selectedId)}
      handleCopy={() => handleCopy(selectedId)}
    >
      <RenderComponent c={element} renderRow={renderRow} />
    </ElementWrapper>
  );
}
