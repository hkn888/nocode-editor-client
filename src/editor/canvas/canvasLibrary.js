export const CANVAS_ELEMENTS = {
  paragraph: ({ c }) => (
    <p
      style={{
        backgroundColor: c.props.backgroundColor,
        color: c.props.color,
      }}
      className="flex-grow"
    >
      {c.props.text}
    </p>
  ),
  image: ({ c }) => (
    <img
      src={c.props.src}
      style={{
        aspectRatio: c.props.aspectRatio,
        objectFit: c.props.objectFit,
        opacity: c.props.opacity,
      }}
    />
  ),
  container: ({ c, renderRow }) => (
    <div
      style={{
        border: "1px dashed #ccc",
        padding: "20px",
        minHeight: c.props.minHeight,
        backgroundColor: c.props.backgroundColor,
      }}
    >
      {c.children && c.children.map((child, index) => renderRow(child, index))}
    </div>
  ),
};
