import { useState } from "react";
import Sidebar from "@/ui-library/components/editor/sidebar";
import Panel from "@/ui-library/components/editor/panel";
import Canvas from "@/ui-library/components/editor/canvas";

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
        text: `預設文字 元件${component.length + 1}`,
      },
    };
    setComponent([...component, newComp]);
  };

  const switchComponent = (index, direction) => {
    const newItem = [...component];
    const lastComponent = component.length - 1;
    const targetIndex = direction === "up" ? index - 1 : index + 1;
    if (index === 0 && direction === "up") {
      return;
    }
    if (index === lastComponent && direction === "down") {
      return;
    }

    newItem[index] = component[targetIndex];
    newItem[targetIndex] = component[index];

    setComponent(newItem);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-blue-500">Header的位置</div>
      <div className="flex flex-1">
        <Sidebar onAdd={addComponent} />
        <div className="flex-grow flex flex-col">
          <div className="h-8 bg-yellow-200">canvas control</div>
          <Canvas
            elements={component}
            selectedId={selectedId}
            setId={setSelectedId}
            switchPosition={switchComponent}
          />
        </div>
        <Panel />
      </div>
    </div>
  );
}
