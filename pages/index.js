import Sidebar from "@/src/editor/sidebar";
import Panel from "@/src/editor/panel";
import Canvas from "@/src/editor/canvas";
import { useKeyboardActions } from "@/src/hooks/useKeyboardActions";

export default function Editor() {
  useKeyboardActions();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-blue-500">Header的位置</div>
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-grow flex flex-col">
          <div className="h-8 bg-yellow-200">canvas control</div>
          <Canvas />
        </div>
        <Panel />
      </div>
    </div>
  );
}
