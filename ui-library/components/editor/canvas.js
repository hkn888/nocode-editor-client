export default function Canvas({ elements, selectedId, setId }) {
  return (
    <div className="bg-gray-100 flex-grow" onClick={() => setId(null)}>
      canvas
      {elements.map((c) => {
        const isSelected = selectedId === c.id;

        return (
          <div
            key={c.id}
            id={c.id}
            onClick={(e) => {
              e.stopPropagation();
              setId(c.id);
            }}
            isSelected={selectedId === c.id}
            className={`cursor-pointer ${
              isSelected
                ? "ring-2 ring-blue-300 border-blue-500"
                : "border border-transparent"
            }`}
          >
            <p
              style={{
                backgroundColor: c.props.backgroundColor,
                color: c.props.color,
              }}
            >
              {c.props.text}
            </p>
          </div>
        );
      })}
    </div>
  );
}
