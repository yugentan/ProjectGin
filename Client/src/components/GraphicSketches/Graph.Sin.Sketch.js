import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const ConfettiAnimation = () => {
  const sketchRef = useRef(null);
  let confLocs;
  let confTheta;

  useEffect(() => {
    const sketch = new p5(p => {
      p.setup = () => {
        p.createCanvas(800, 470, p.WEBGL).parent(sketchRef.current);
        p.camera(800, -600, 800, 0, 0, 0, 0, 1, 0);

        confLocs = [];
        confTheta = [];

        for (let i = 0; i < 200; i++) {
          const a = p.random(-500, 500);
          const b = p.random(-500, 500);
          const c = p.random(-500, 500);
          confLocs.push(p.createVector(a, b, c));
          confTheta.push(p.random(0, 360));
        }

    
      };

      p.draw = () => {
        p.background(125);
        p.angleMode(p.DEGREES);

        const xLoc = p.cos(p.frameCount * 1) * p.height;
        const zLoc = p.sin(p.frameCount * 1) * p.height;
        p.camera(xLoc, -600, zLoc, 0, 0, 0, 0, 1, 0);

        p.pointLight(255, 0, 0, -300, -300, -300);
        p.pointLight(255, 0, 0, 300, 300, 300);

        p.ambientMaterial(255, 0, 0);

        for (let x = -400; x < 400; x += 50) {
          for (let z = -400; z < 400; z += 50) {
            p.push();
            p.translate(x, 0, z);
            const distance = p.dist(0, 0, x, z) + p.frameCount;
            const length = p.map(p.sin(distance), -1, 1, 100, 300);
            p.box(50, length, 50);
            p.pop();
          }
        }

        p.normalMaterial();
        confetti();
      };

      function confetti() {
        for (let i = 0; i < confLocs.length; i++) {
          p.push();
          p.translate(confLocs[i].x, confLocs[i].y, confLocs[i].z);
          p.rotateX(confTheta[i]);
          p.plane(15, 15);
          confLocs[i].y += 1;
          confTheta[i] += 10;
          if (confLocs[i].y > 0) {
            confLocs[i].y = -800;
          }
          p.pop();
        }
      }
    });

    return () => {
      sketch.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} />
      <p style={{color: "#efefef", textAlign:"center"}}>3D Sin Grid Simulation. Credits: CM2030 Graphics Programming</p>

    </div>
  );
};

export default ConfettiAnimation;