export default function Editor() {
  return (
    <div className="flex flex-col min-h-screen">
      <div className="w-full bg-blue-500">Header的位置</div>
      <div className="flex flex-1">
        <div className="w-16 bg-gray-200 border-r border-gray-500">sidebar</div>
        <div className="flex-grow flex flex-col">
          <div className="h-8 bg-yellow-200">canvas control</div>
          <div className="bg-gray-100 flex-grow">canvas</div>
        </div>
        <div className="w-16 bg-gray-200 border-l border-gray-500">panel</div>
      </div>
    </div>
  );
}
