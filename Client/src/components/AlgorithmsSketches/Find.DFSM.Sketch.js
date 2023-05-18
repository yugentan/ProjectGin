import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
const DFSMaze = () => {
  const sketchRef = useRef(null);
  useEffect(() => {
    const sketch = new p5((p) => {
      let grid;
      let col;
      let row;
      let current;
      let stack;
      let w;
      let bfsBtn;
      let dfsBtn;
      let astarBtn;
      let gfsBtn;
      let dikBtn;
      let btns = [];
      let algoUsed;

      let path = [];
      let queue = [];
      let found = false;
      p.setup = () => {
        p.createCanvas(1400, 1000).parent(sketchRef.current);
        w = 50;
        col = p.floor(p.width / w);
        row = p.floor(p.height / w);
        grid = [];
        stack = [];
        for (let j = 0; j < row; j++) {
          for (let i = 0; i < col; i++) {
            const cell = new Cell(i, j);
            grid.push(cell);
          }
        }
        current = grid[0];
        createButtons();
      };

      p.draw = () => {
        p.background(0);
        generateMaze();
        if(stack.length == 0 && algoUsed == "Breath First Search"){
          bfsV();
        }
      };

      function checksum(i, j) {
        if (i < 0 || j < 0 || i > col - 1 || j > row - 1) {
          return -1;
        }
        return i + j * col;
      }
      // function enableBtn(){
      //   if(mazeReady){
      //     for(let i = 0; i < btns.length; i++){
      //       btns[i].removeAttribute('disabled');
      //     }
      //   }else{
      //     for(let i = 0; i < btns.length; i++){
      //       btns[i].attribute('disabled', '');
      //     }
      //   }
      // }
      function removeWall(a, b) {
        const x = a.i - b.i;
        if (x === 1) {
          a.wall[3] = false;
          b.wall[1] = false;
        } else if (x === -1) {
          a.wall[1] = false;
          b.wall[3] = false;
        }
        const y = a.j - b.j;
        if (y === 1) {
          a.wall[0] = false;
          b.wall[2] = false;
        } else if (y === -1) {
          a.wall[2] = false;
          b.wall[0] = false;
        }
      }
      function bfsV() {
        if(!found){
          let start = grid[0];
          let end = grid[grid.length - 1];
          queue.push(start);
          console.log(queue);
          found = true;
        }
        
        // visited[start.i + start.j * col] = true;
        // while (queue.length > 0) {
        //   const current = queue.shift();
        //   if (current === end) {
        //     // Found the end point, construct the path
        //     let temp = current;
        //     path.push(temp);
        //     while (temp.previous) {
        //       path.push(temp.previous);
        //       temp = temp.previous;
        //     }
        //     break;
        //   }
        //   const neighbors = current.checkNeighbours();
        //   for (let i = 0; i < neighbors.length; i++) {
        //     const neighbor = neighbors[i];
        //     if (!visited[neighbor.i + neighbor.j * col]) {
        //       visited[neighbor.i + neighbor.j * col] = true;
        //       neighbor.previous = current;
        //       queue.push(neighbor);
        //     }
        //   }
        // }
      }

     
      function generateMaze() {
        for (let i = 0; i < grid.length; i++) {
          grid[i].show();
        }
        current.visited = true;
        current.highlight();

        const next = current.checkNeighbours();
        if (next) {
          next.visited = true;
          stack.push(current);
          removeWall(current, next);
          current = next;
        } else if (stack.length > 0) {
          const cell = stack.pop();
          current = cell;
        }
      }
      function createButtons(){
        bfsBtn = p.createButton("Breath First Search");
        dfsBtn = p.createButton("Depth First Search");
        astarBtn = p.createButton("A* Search");
        gfsBtn = p.createButton("Greedy First Search");
        dikBtn = p.createButton("Dikjstra");

        bfsBtn.position(p.width + 10, p.height/2 - 200);
        dfsBtn.position(p.width + 10, p.height/2 - 100);
        astarBtn.position(p.width + 10, p.height/2);
        gfsBtn.position(p.width + 10, p.height/2 + 100);
        dikBtn.position(p.width + 10, p.height/2 + 200);
        btns.push(bfsBtn);
        btns.push(dfsBtn);
        btns.push(astarBtn);
        btns.push(gfsBtn);
        btns.push(dikBtn);

        for(let i = 0; i < btns.length; i++){
          styleBtn(btns[i]);
          btns[i].mousePressed(()=>{
            algoUsed = btns[i].elt.innerHTML; 
            btnActive(btns[i]);
          });
        }
      }

      function styleBtn(btn){
        btn.style("background-color", "#262626");
        btn.style("cursor", "pointer");
        btn.style("padding", "10px 20px");
        btn.style("color", "#ce1c1b");
        btn.style("border", "2px solid #ce1c1b");
        btn.style("border-radius", "8px");
        btn.style("height", "60px");
        btn.style("font-size", "24px");
        btn.style("box-shadow", "0px 4px 6px rgba(0, 0, 0, 0.45)");
        btn.style("transition", "250ms");
        btn.style("min-width", "300px");
      }
      function btnActive(btn){
        btn.style("background-color", "#ce1c1b");
        btn.style("color", "#efefef");
        btn.style("box-shadow", "0px 4px 6px rgba(0, 0, 0, 0.95)");
        for(let i = 0; i < btns.length; i++){
          if(btns[i] != btn){
            styleBtn(btns[i]);
          }
        }
      }
    
      class Cell {
        constructor(i, j) {
          this.i = i;
          this.j = j;
          this.wall = [true, true, true, true];
          this.visited = false;
        }

        show() {
          const x = this.i * w;
          const y = this.j * w;

          p.stroke(255);
          if (this.wall[0]) {
            p.line(x, y, x + w, y);
          }
          if (this.wall[1]) {
            p.line(x + w, y, x + w, y + w);
          }
          if (this.wall[2]) {
            p.line(x + w, y + w, x, y + w);
          }
          if (this.wall[3]) {
            p.line(x, y + w, x, y);
          }
          if (this === grid[0]) {
            p.noStroke();
            p.fill(0, 0, 255);
            p.rect(x, y, w, w);
          } else if (this === grid[grid.length - 1]) {
            p.noStroke();
            p.fill(255, 0, 0, 100);
            p.rect(x, y, w, w);
          } else if (this.visited) {
            p.noStroke();
            p.fill(100, 255, 100, 100);
            p.rect(x, y, w, w);
          }
        }

        checkNeighbours() {
          const arr = [];
          const top = grid[checksum(this.i, this.j - 1)];
          const right = grid[checksum(this.i + 1, this.j)];
          const bottom = grid[checksum(this.i, this.j + 1)];
          const left = grid[checksum(this.i - 1, this.j)];

          if (top && !top.visited) {
            arr.push(top);
          }
          if (right && !right.visited) {
            arr.push(right);
          }
          if (bottom && !bottom.visited) {
            arr.push(bottom);
          }
          if (left && !left.visited) {
            arr.push(left);
          }

          if (arr.length > 0) {
            const choose = p.floor(p.random(0, arr.length));
            return arr[choose];
          } else {
            return undefined;
          }
        }

        highlight() {
          const x = this.i * w;
          const y = this.j * w;
          p.noStroke();
          p.fill(255, 0, 0, 100);
          p.rect(x, y, w, w);
        }
      }
    });

    return () => {
      sketch.remove();
    };
  }, []);
 return (
      <div ref={sketchRef} />
  );
};

export default DFSMaze;
