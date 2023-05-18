import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const Sketch = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = new p5(p => {
      p.setup = () => {
        p.createCanvas(1000, 1000).parent(sketchRef.current);
      };

      p.draw = () => {
        p.background(220);
        // Your p5.js drawing code goes here
        p.text("hello", 10, 10);
      };
    });

    return () => {
      sketch.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default Sketch;