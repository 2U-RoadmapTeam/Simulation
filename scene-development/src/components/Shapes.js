const Square = () => {
  return (
    <svg width="400" height="180" className="square">
      <rect
        x="0"
        y="0"
        rx="20"
        ry="20"
        width="150"
        height="150"
        className="SVG1"
      />
    </svg>
  );
};

const Circle = () => {
  return (
    <svg height="200" width="200" className="circle">
      <circle
        cx="75"
        cy="75"
        r="75"
        stroke="black"
        strokeWidth="3"
        fill="red"
        className="SVG2"
      />
    </svg>
  );
};

export {Circle, Square}