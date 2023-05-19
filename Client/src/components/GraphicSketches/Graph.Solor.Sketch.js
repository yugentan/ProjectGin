import React, { useEffect, useRef } from 'react';
import p5 from "p5";

const SolarGraphic = () => {
    const sketchRef = useRef(null);

    useEffect(() => {
      const sketch = new p5(p => {
        p.setup = () => {
          p.createCanvas(800, 470, p.WEBGL).parent(sketchRef.current);
          p.angleMode(p.DEGREES);
        };
  
        p.draw = () => {
          p.background(0);
          p.camera(-p.mouseX, -p.mouseY, 800, 0, 0, 0, 0, 1, 0);
          drawSun();
          drawEarth();
          drawMoon();
        };
  
        function drawAxis() {
          p.strokeWeight(5);
          p.stroke(255, 0, 0); //red x axis
          p.line(1000, 0, 0, -1000, 0, 0);
          p.stroke(0, 255, 0); //green y axis
          p.line(0, 1000, 0, 0, -1000, 0);
          p.stroke(0, 0, 255);
          p.line(0, 0, 1000, 0, 0, -1000);
        }
  
        function drawSun() {
          p.push();
          p.rotateY(p.frameCount / 3);
          drawAxis();
          p.noStroke();
          p.fill(255, 255, 0);
          p.sphere(80);
          p.pop();
          p.pointLight(255, 255, 0, 0, 0, 0);
          p.pointLight(255, 255, 255, 0, 0, 0);
        }
  
        function drawEarth() {
          p.push();
          p.rotateY(p.frameCount / 3); //follow sun
          p.translate(400, 0, 0);
          p.rotateY(p.frameCount);
          drawAxis();
          p.noStroke();
          p.ambientMaterial(0, 0, 255);
          p.sphere(40);
          p.pop();
        }
  
        function drawMoon() {
          p.push();
          p.rotateY(p.frameCount / 3);
          p.translate(400, 0, 0);
          p.rotateY(p.frameCount);
          p.rotateY(-2 * p.frameCount);
          p.translate(100, 0, 0);
          drawAxis();
          p.noStroke();
          p.fill(125);
          p.ambientMaterial(255);
          p.sphere(20);
          p.pop();
        }
      });
  
      return () => {
        sketch.remove();
      };
    }, []);
  
    return (
      <div>
        <div ref={sketchRef} />
        <p style={{color: "#efefef", textAlign:"center"}}>3D Solar Simulation. Credits: CM2030 Graphics Programming</p>

      </div>
    );
  };
  

export default SolarGraphic;