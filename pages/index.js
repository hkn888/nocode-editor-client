import { useState } from "react";
import Sidebar from "@/src/components/editor/sidebar";
import Panel from "@/src/components/editor/panel";
import Canvas from "@/src/components/editor/canvas";

export default function Editor() {
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
