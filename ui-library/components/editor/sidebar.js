export default function Sidebar({ onAdd }) {
  return (
    <div className="w-16 bg-gray-200 border-r border-gray-500">
      sidebar
      <button className="w-8 h-8 bg-blue-300" onClick={onAdd}>
        T
      </button>
    </div>
  );
}
