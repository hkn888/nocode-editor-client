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
};
