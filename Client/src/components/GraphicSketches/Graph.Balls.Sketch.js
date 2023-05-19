import React, { useEffect, useRef } from 'react';
import p5 from 'p5';

const BallAnimation = () => {
  const sketchRef = useRef(null);
  let balls;

  useEffect(() => {
    const sketch = new p5(p => {
      p.setup = () => {
        p.createCanvas(800, 470).parent(sketchRef.current);
        balls = [];
        for (let i = 0; i < 2500; i++) {
          const ball = new Ball();
          balls.push(ball);
        }
      };

      p.draw = () => {
        p.background(0, 10); // Add transparency to the background to create the fading effect
        for (let i = 0; i < balls.length; i++) {
          balls[i].run();
        }
      };

      class Ball {
        constructor() {
          this.velocity = p.createVector(0, 0);
          this.location = p.createVector(p.random(0, p.width / 2), p.random(0, p.height / 2));
          this.acceleration = p.createVector(0, 0);
          this.maxVelocity = p.random(3, 5);
        }

        run() {
          this.draw();
          this.move();
          this.edges();
        }

        draw() {
        p.noStroke()
          p.fill(105, 233, 240, 50); // Lower alpha value for a fading effect
          p.ellipse(this.location.x, this.location.y, 5, 5);
        }

        move() {
          const mouse = p.createVector(p.mouseX, p.mouseY);
          const dir = p5.Vector.sub(mouse, this.location);
          dir.normalize();
          dir.mult(p.random(0, 0.5));
          this.acceleration = dir;
          this.velocity.add(this.acceleration);
          this.velocity.limit(this.maxVelocity);
          this.location.add(this.velocity);
        }

        edges() {
          if (this.location.x < 0) this.location.x = p.width;
          else if (this.location.x > p.width) this.location.x = 0;
          else if (this.location.y < 0) this.location.y = p.height;
          else if (this.location.y > p.height) this.location.y = 0;
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
        <p style={{color: "#efefef", textAlign:"center"}}>Improvisation of Following the mouse. Credits: CM2030 Graphics Programming</p>

      </div>
  );
};

export default BallAnimation;