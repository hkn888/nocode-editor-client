export default function ElementWrapper({
  children,
  isSelected,
  handleSelect,
  handleDelete,
  handleCopy,
  handleMoveUp,
  handleMoveDown,
}) {
  return (
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleSelect();
      }}
      className={`cursor-pointer flex ${
        isSelected
          ? "ring-2 ring-blue-300 border-blue-500"
          : "border border-transparent"
      }`}
    >
      {children}
      {isSelected && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleDelete();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            x
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleCopy();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            c
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveUp();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            ↑
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleMoveDown();
            }}
            className="w-8 h-8 bg-gray-200 border border-gray-500"
          >
            ↓
          </button>
        </>
      )}
    </div>
  );
}
