import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const SelectionSort = ({ intArr }) => {
  const sketchRef = useRef(null);
  const [comparisons, setComparisons] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  let values = [...intArr];
  let rW = 450 / intArr.length;
  let startTime = 0;

  useEffect(() => {
    const sketch = new p5((p) => {
      p.setup = () => {
        p.createCanvas(450, 400).parent(sketchRef.current);
        startTime = Date.now();
        selectionSort(values);
      };

      p.draw = () => {
       
          setTimeElapsed(Date.now() - startTime);
          p.background(0);
          p.textSize(24);
          p.fill(255);
          p.text("Selection Sort", 10, 30);
          p.genRect();
          if (p.checkSort(values)) {
          p.noLoop();
        }
      };

      p.genRect = () => {
        for (let i = 0; i < values.length; i++) {
          p.noStroke();
          p.fill(255);
          p.rect(i * rW, 400 - values[i], rW, 400);
        }
      };

      async function selectionSort(arr) {
        const n = arr.length;

        for (let i = 0; i < n - 1; i++) {
          let minIndex = i;

          for (let j = i + 1; j < n; j++) {
            if (arr[j] < arr[minIndex]) {
              minIndex = j;
            }
            setComparisons((prevComparisons) => prevComparisons + 1);
          }

          await swap(arr, i, minIndex);
        }
      }

      async function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        await sleep(0.2);
      }

      p.checkSort = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
          if (arr[i] > arr[i + 1]) {
            return false;
          }
        }
        return true;
      };

      function sleep(ms) {
        return new Promise((resolve) => setTimeout(resolve, ms));
      }
    });

    return () => {
      sketch.remove();
    };
  }, []);

  return (
    <div>
      <div ref={sketchRef} />
      <div style={{ display: "flex", color: "#efefef", justifyContent: "space-between" }}>
        <p>Comparisons: {comparisons}</p>
        <p>Time Elapsed: {timeElapsed / 100}ms</p>
      </div>
    </div>
  );
};

export default SelectionSort;