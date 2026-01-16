import { useState } from "react";

export default function Editor() {
  const [component, setComponent] = useState([]);
  const [selectedId, setSelectedId] = useState(null);

  const addComponent = () => {
    const newComp = {
      id: crypto.randomUUID ? crypto.randomUUID() : Date.now(),
      type: "paragraph",
      props: {
        color: "#ffffff",
        backgroundColor: "#000000",
        text: "預設文字",
      },
    };
    setComponent([...component, newComp]);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-blue-500">Header的位置</div>
      <div className="flex flex-1">
        <div className="w-16 bg-gray-200 border-r border-gray-500">
          sidebar
          <button
            className="w-8 h-8 bg-blue-300"
            onClick={() => addComponent()}
          >
            T
          </button>
        </div>
        <div className="flex-grow flex flex-col">
          <div className="h-8 bg-yellow-200">canvas control</div>
          <div
            className="bg-gray-100 flex-grow"
            onClick={() => setSelectedId(null)}
          >
            canvas
            {component.map((c) => {
              const isSelected = selectedId === c.id;

              return (
                <div
                  key={c.id}
                  id={c.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedId(c.id);
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
        </div>
        <div className="w-16 bg-gray-200 border-l border-gray-500">panel</div>
      </div>
    </div>
  );
}
