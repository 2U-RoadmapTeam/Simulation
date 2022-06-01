import Draggable from "react-draggable";
import { Square, Circle } from "../../../Shapes";
import { useState, useEffect } from "react";
import Notebook from "../../Notebook";
const arr = [Square, Circle];

export default function Simulation() {
  const [coordinates, setCoordinates] = useState({
    div1x: 0,
    div1y: 0,
    div2x: 0,
    div2y: 0,
  });
  const [state, setState] = useState("Closed");
  const handleStop1 = (event, dragElement) => {
    setCoordinates((prevState) => ({
      ...prevState,
      div1x: dragElement.x,
      div1y: dragElement.y,
      div2x: prevState.div2x,
      div2y: prevState.div2y,
    }));
  };
  const handleStop2 = (event, dragElement) => {
    setCoordinates((prevState) => ({
      ...prevState,
      div1x: prevState.div1x,
      div1y: prevState.div1y,
      div2x: dragElement.x,
      div2y: dragElement.y,
    }));
  };
  useEffect(() => {
    checkIfColliding(
      coordinates.div1x,
      coordinates.div1y,
      200,
      100,
      coordinates.div2x,
      coordinates.div2y,
      200,
      100
    );
  });
  const checkIfColliding = () => {
    const { div1x, div1y, div2x, div2y } = coordinates;
    if (div2x >= div1x && div2x <= div1x + 150 && div2y <= div1y) {
      setState("Open");
    } else if (div1x >= div2x && div1x <= div2x + 150 && div2y <= div1y) {
      setState("Open");
    } else {
      setState("Closed");
    }
  };
  return (
    <div className="scene">
      <h1>{state}</h1>
      <h2>
        Position1: X : {coordinates.div1x} - Y : {coordinates.div1y}
      </h2>
      <h2>
        Position2: X : {coordinates.div2x} - Y : {coordinates.div2y}
      </h2>
      {/* <Draggable
            onStop={handleStop1}
            position={{ x: coordinates.div1x, y: coordinates.div1y }}
            bounds={{ left: -860, top: 0, right: 860, bottom: 720 }}
          >
            <div className="Comp1">
              <code>Div 1</code>
            </div>
          </Draggable>
          <Draggable
            onStop={handleStop2}
            position={{ x: coordinates.div2x, y: coordinates.div2y }}
            bounds={{ left: -860, top: -100, right: 860, bottom: 620 }}
          >
            <div className="Comp1">
              <code>Div 2</code>
            </div>
          </Draggable> */}
      {arr.map((comp, i) => (
        <Draggable
          key={i}
          onStop={eval(`handleStop${i + 1}`)}
          position={{
            x: eval(`coordinates.div${i + 1}x`),
            y: eval(`coordinates.div${i + 1}y`),
          }}
        >
          <div className="Comp1" tabIndex={`${i + 1}`}>
            {comp()}
          </div>
        </Draggable>
      ))}
    </div>
  );
}
