import React, { useRef, useEffect } from 'react';
import p5 from 'p5';

function Sketch({ setup, draw }) {
  const sketchRef = useRef(null);

  useEffect(() => {
    const canvas = new p5(sketchRef.current, 'sketch-container');
    if (setup) canvas.setup = () => setup(canvas);
    if (draw) canvas.draw = () => draw(canvas);
    return () => canvas.remove();
  }, [setup, draw]);

  return <div id="sketch-container" ref={sketchRef}></div>;
}

export default Sketch;
