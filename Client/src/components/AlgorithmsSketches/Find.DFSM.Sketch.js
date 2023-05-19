import React, { useEffect, useRef } from "react";
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

      let start;
      let end;

      let path = [];
      let queue = [];
      let dStack = [];
      let dQueue = [];
      let found = false;
      let pq;
      let gQueue = [];
      let bCurrent;
      let dCurrent;
      let aCurrent;
      let gCurrent;

      let temp;
      p.setup = () => {
        p.createCanvas(1400, 1000).parent(sketchRef.current);
        w =50;
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
        p.frameRate(30);
      };

      p.draw = () => {
        p.background(0);
        generateMaze();
        if (stack.length === 0 && algoUsed === "Breath First Search") {
          bfsV();
        }
        if (stack.length === 0 && algoUsed === "Depth First Search") {
          dfsV();
        }
        if (stack.length === 0 && algoUsed === "A* Search") {
          aSearch();
        }
        if (stack.length === 0 && algoUsed === "Greedy First Search") {
          gfsV();
        }
        if(stack.length === 0 && algoUsed === "Dikjstra"){
          dijkstra();
        }
      };
      function checksum(i, j) {
        if (i < 0 || j < 0 || i > col - 1 || j > row - 1) {
          return -1;
        }
        return i + j * col;
      }

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
        // Initialize BFS
        if (!found) {
          bCurrent = queue.shift();
          if (bCurrent != end) {
            bCurrent.visitedBFS = true;
            let neighbors = bCurrent.getNeighbors();
            if (neighbors.length != 0 && neighbors != null) {
              for (let i = 0; i < neighbors.length; i++) {
                if (!neighbors[i].visitedBFS) {
                  queue.push(neighbors[i]);
                  neighbors[i].previous = bCurrent;
                  neighbors[i].visitedBFS = true;
                }
              }
            }
          } else {
            found = true;
          }
        } else {
          if (bCurrent != start) {
            temp = bCurrent;
            path.push(bCurrent);
            bCurrent = temp.previous;
          } else {
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedBFS = false;
            }
          }
        }
      }

      function dfsV() {
        if (!found) {
          dCurrent = dStack.pop();
          if (dCurrent != end) {
            dCurrent.visitedDFS = true;
            let neighbors = dCurrent.getNeighbors();
            for (let i = 0; i < neighbors.length; i++) {
              if (!neighbors[i].visitedDFS) {
                dStack.push(neighbors[i]);
                neighbors[i].previous = dCurrent;
              }
            }
          } else {
            found = true;
          }
        } else {
          if (dCurrent != start) {
            temp = dCurrent;
            path.push(dCurrent);
            dCurrent = temp.previous;
          } else {
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedDFS = false;
            }
          }
        }
      }

      function aSearch() {

        if (!found) {
          aCurrent = pq.dequeue();
          if (aCurrent != end) {
            aCurrent.visitedAStar = true;
            let neighbors = aCurrent.getNeighbors();
            for (let i = 0; i < neighbors.length; i++) {
              const neighbor = neighbors[i];
              const tentativeG = aCurrent.g + 1; // Assuming all edge costs are 1
              if (tentativeG < neighbor.g) {
                neighbor.previous = aCurrent;
                neighbor.g = tentativeG;
                neighbor.h = heuristic(neighbor, end);
                neighbor.f = neighbor.g + neighbor.h;

                if (!pq.queue.includes(neighbor)) {
                  pq.enqueue(neighbor);
                }
              }
            }
          } else {
            found = true;
          }
        } else {
          if (aCurrent != start) {
            temp = aCurrent;
            path.push(aCurrent);
            aCurrent = temp.previous;
          } else {
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedAStar = false;
            }
          }
        }
      }

      function gfsV() {
        if (!found) {
          gCurrent = gQueue.shift();
          if (gCurrent != end) {
            gCurrent.visitedGFS = true;
            let neighbors = gCurrent.getNeighbors();
            if (neighbors.length != 0 && neighbors != null) {
              neighbors.sort((a, b) => heuristic(b, end) - heuristic(a, end));
              for (let i = 0; i < neighbors.length; i++) {
                if (!neighbors[i].visitedGFS) {
                  neighbors[i].g = gCurrent.g + 1; 
                  gQueue.unshift(neighbors[i]); 
                  neighbors[i].previous = gCurrent;
                  neighbors[i].visitedGFS = true;
                }
              }
            }
          } else {
            found = true;
          }
        } else {
          if (gCurrent != start) {
            temp = gCurrent;
            path.push(gCurrent);
            gCurrent = temp.previous;
          } else {
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedGFS = false;
            }
          }
        }
      }

      function heuristic(cellA, cellB) {
        const dX = Math.abs(cellA.i - cellB.i);
        const dY = Math.abs(cellA.j - cellB.j);
        return dX + dY;
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

      function dijkstra() {
        if (!found) {
          dCurrent = dQueue.shift();
          if (dCurrent != end) {
            dCurrent.visitedDijkstra = true;
            let neighbors = dCurrent.getNeighbors();
            if (neighbors.length != 0 && neighbors != null) {
              for (let i = 0; i < neighbors.length; i++) {
                let neighbor = neighbors[i];
                let tempG = dCurrent.g + 1; // Assuming each step has a cost of 1
      
                if (tempG < neighbor.g) {
                  neighbor.g = tempG;
                  neighbor.previous = dCurrent;
                }
      
                if (!neighbor.visitedDijkstra) {
                  dQueue.push(neighbor);
                  neighbor.visitedDijkstra = true;
                }
              }
            }
          } else {
            found = true;
          }
        } else {
          if (dCurrent != start) {
            temp = dCurrent;
            path.push(dCurrent);
            dCurrent = temp.previous;
          } else {
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedDijkstra = false;
            }
          }
        }
      }

      function createButtons() {
        bfsBtn = p.createButton("Breath First Search");
        dfsBtn = p.createButton("Depth First Search");
        astarBtn = p.createButton("A* Search");
        gfsBtn = p.createButton("Greedy First Search");
        dikBtn = p.createButton("Dikjstra");

        bfsBtn.position(p.width + 10, p.height / 2 - 200);
        dfsBtn.position(p.width + 10, p.height / 2 - 100);
        astarBtn.position(p.width + 10, p.height / 2);
        gfsBtn.position(p.width + 10, p.height / 2 + 100);
        dikBtn.position(p.width + 10, p.height / 2 + 200);
        btns.push(bfsBtn);
        btns.push(dfsBtn);
        btns.push(astarBtn);
        btns.push(gfsBtn);
        btns.push(dikBtn);

        for (let i = 0; i < btns.length; i++) {
          styleBtn(btns[i]);
          btns[i].mousePressed(() => {
            found = false;
            dStack = [];
            queue = [];
            path = [];
            dQueue = [];
            pq = new PriorityQueue((a, b) => a.f - b.f);
            gQueue = [];
            start = grid[0];
            end = grid[grid.length - 1];
            for (let i = 0; i < grid.length; i++) {
              grid[i].visitedBFS = false;
              grid[i].visitedDFS = false;
              grid[i].visitedAStar = false;
              grid[i].visitedGFS = false;
              grid[i].visitedDijkstra = false;
              grid[i].g = 9999;
            }
            start.g = 0;
            start.h = heuristic(start, end);
            start.f = start.g + start.h;

            
            dQueue.push(start);
            pq.enqueue(start);
            queue.push(start);
            dStack.push(start);
            gQueue.push(start);
            algoUsed = btns[i].elt.innerHTML;
            btnActive(btns[i]);
          });
        }
      }

      function styleBtn(btn) {
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
      function btnActive(btn) {
        btn.style("background-color", "#ce1c1b");
        btn.style("color", "#efefef");
        btn.style("box-shadow", "0px 4px 6px rgba(0, 0, 0, 0.95)");
        for (let i = 0; i < btns.length; i++) {
          if (btns[i] != btn) {
            styleBtn(btns[i]);
          }
        }
      }
      class PriorityQueue {
        constructor(comparator) {
          this.queue = [];
          this.comparator = comparator;
        }

        enqueue(element) {
          if (this.isEmpty()) {
            this.queue.push(element);
          } else {
            let added = false;
            for (let i = 0; i < this.queue.length; i++) {
              if (this.comparator(element, this.queue[i]) < 0) {
                this.queue.splice(i, 0, element);
                added = true;
                break;
              }
            }
            if (!added) {
              this.queue.push(element);
            }
          }
        }

        dequeue() {
          if (this.isEmpty()) {
            return null;
          }
          return this.queue.shift();
        }

        isEmpty() {
          return this.queue.length === 0;
        }
      }
      class Cell {
        constructor(i, j) {
          this.i = i;
          this.j = j;
          this.wall = [true, true, true, true];
          this.visited = false;
          this.visitedBFS = false;
          this.visitedDFS = false;
          this.visitedAStar = false;
          this.visitedGFS = false;
          this.visitedDijkstra = false
          this.previous = null;
          this.g = 9999;
          this.h = null;
          this.f = null;
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

          if (this.visitedBFS || this.visitedDFS || this.visitedAStar || this.visitedGFS || this.visitedDijkstra) {
            p.noStroke();
            p.fill(255);
            p.ellipse(x + w / 2, y + w / 2, 10);
          }

          if (path.includes(this)) {
            p.noStroke();
            p.fill(255, 0, 0);
            p.ellipse(x + w / 2, y + w / 2, 10);
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
        getNeighbors() {
          const neighbors = [];
          const top = grid[checksum(this.i, this.j - 1)];
          const right = grid[checksum(this.i + 1, this.j)];
          const bottom = grid[checksum(this.i, this.j + 1)];
          const left = grid[checksum(this.i - 1, this.j)];

          if (top && !this.wall[0]) {
            neighbors.push(top);
          }
          if (right && !this.wall[1]) {
            neighbors.push(right);
          }
          if (bottom && !this.wall[2]) {
            neighbors.push(bottom);
          }
          if (left && !this.wall[3]) {
            neighbors.push(left);
          }

          return neighbors;
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
  return <div ref={sketchRef} />;
};

export default DFSMaze;
