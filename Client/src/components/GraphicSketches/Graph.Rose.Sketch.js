import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const MaurerRose = () => {
  const sketchRef = useRef(null);

  useEffect(() => {
    const sketch = new p5(p => {
      let n = 2;
      let d = 52;


      p.setup = () => {
        p.createCanvas(800, 470).parent(sketchRef.current);
        p.angleMode(p.DEGREES);
        p.frameRate(2);
   
      };

      p.draw = () => {
        p.background(0);
        // Get the values d and n to use for roses
        d = p.frameCount % 179 + 1
        n = p.frameCount % 10 + 1

        p.translate(p.width / 2, p.height / 2);
        
        // Place the white lines of the Maurer rose
        p.stroke(255);
        p.noFill();
        p.beginShape();
        p.strokeWeight(1);
        for (let i = 0; i < 361; i++) {
          let k = i * d;
          let r = 150 * p.sin(n * k);
          let x = r * p.cos(k);
          let y = r * p.sin(k);
          p.vertex(x, y);
        }
        p.endShape();

        // Build the Polar rose (in pink)
        p.noFill();
        p.stroke(255, 0, 255, 255);
        p.strokeWeight(2);
        p.beginShape();
        for (let i = 0; i < 361; i++) {
          let r = 150 * p.sin(n * i);
          let x = r * p.cos(i);
          let y = r * p.sin(i);
          p.vertex(x, y);
        }
        p.endShape();
      };

    });

    return () => {
      sketch.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} />
      <p style={{color: "#efefef", textAlign:"center"}}>A Generation of MaurerRose. Credits: CM2030 Graphics Programming</p>
    </div>
  );
};

export default MaurerRose;