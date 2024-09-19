import { LegacyRef, useRef, useState } from 'react';
import { Circle, Layer, Stage } from 'react-konva';
import { KonvaEventObject } from 'konva/lib/Node';
import './App.css';

function App() {
  const [scale, setScale] = useState(1.0);
  const [position, setPosition] = useState({ x: 1.0, y: 1.0 });
  const stageRef = useRef<any>(null);

  const onMouseDown = (e: KonvaEventObject<MouseEvent>) => {
    if (e.evt.ctrlKey) {
      setScale(1.0);
      setPosition({ x: 1.0, y: 1.0 })
    }
  }

  const onMouseWheel = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    increaseScale(e);
  }

  const increaseScale = (e: KonvaEventObject<WheelEvent>) => {
    e.evt.preventDefault();
    const currentStageRef = stageRef.current;
    if (currentStageRef) {
      const stage = currentStageRef.getStage();
      const scaleBy = 1.1;
      const oldScale = stage.scaleX();

      const mousePointTo = {
        x: stage.getPointerPosition().x / oldScale - stage.x() / oldScale,
        y: stage.getPointerPosition().y / oldScale - stage.y() / oldScale
      };

      const newScale = e.evt.deltaY < 0 ? oldScale * scaleBy : oldScale / scaleBy;
      const newPosition = {
        x: -(mousePointTo.x - stage.getPointerPosition().x / newScale) * newScale,
        y: -(mousePointTo.y - stage.getPointerPosition().y / newScale) * newScale
      }
      setScale(newScale);
      setPosition(newPosition);
    }
  }

  return <Stage
    width={window.innerWidth}
    height={window.innerHeight}
    scaleX={scale}
    scaleY={scale}
    x={position.x}
    y={position.y}
    onMouseDown={onMouseDown}
    onWheel={onMouseWheel}
    ref={stageRef}
    draggable={true}
  >
    <Layer>
      <Circle
        x={window.innerWidth / 2}
        y={window.innerHeight / 2}
        radius={50}
        fill="green"
        shadowBlur={5}
      />
    </Layer>
  </Stage>
}

export default App;
