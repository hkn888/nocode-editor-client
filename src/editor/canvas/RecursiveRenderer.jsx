import ElementWrapper from "@/src/components/ElementWrapper";
import { CANVAS_ELEMENTS } from "./canvasLibrary";

export default function RecursiveRenderer({
  element,
  index,
  selectedId,
  handleSelect,
  handleDelete,
  handleCopy,
  handleMoveUp,
  handleMoveDown,
}) {
  const renderRow = (child, childIndex) => (
    <RecursiveRenderer
      element={child}
      key={child.id}
      index={childIndex}
      selectedId={selectedId}
      handleSelect={handleSelect}
      handleDelete={handleDelete}
      handleCopy={handleCopy}
      handleMoveUp={handleMoveUp}
      handleMoveDown={handleMoveDown}
    />
  );

  const RenderComponent = CANVAS_ELEMENTS[element.type];

  const isSelected = element.id === selectedId;

  if (!RenderComponent) return null;
  return (
    <ElementWrapper
      key={element.id}
      id={element.id}
      isSelected={isSelected}
      handleSelect={() => handleSelect(element.id)}
      handleDelete={() => handleDelete(selectedId)}
      handleCopy={() => handleCopy(selectedId)}
      handleMoveUp={() => handleMoveUp(index, "up")}
      handleMoveDown={() => handleMoveDown(index, "down")}
    >
      <RenderComponent c={element} renderRow={renderRow} />
    </ElementWrapper>
  );
}
