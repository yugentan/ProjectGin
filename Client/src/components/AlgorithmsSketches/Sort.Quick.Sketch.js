import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const Quicksort = ({ intArr }) => {
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
        quickSort(values, 0, values.length - 1);
      };

      p.draw = () => {
        setTimeElapsed(Date.now() - startTime);
        p.background(0);
        p.textSize(24);
        p.fill(255);
        p.text("Quicksort", 10, 30);
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

      async function quickSort(arr, low, high) {
        if (low < high) {
          const pivotIndex = await partition(arr, low, high);
          await quickSort(arr, low, pivotIndex - 1);
          await quickSort(arr, pivotIndex + 1, high);
        }
      }

      async function partition(arr, low, high) {
        const pivot = arr[high];
        let i = low - 1;

        for (let j = low; j < high; j++) {
          if (arr[j] < pivot) {
            i++;
            await swap(arr, i, j);
          }
        }

        await swap(arr, i + 1, high);
        return i + 1;
      }

      async function swap(arr, i, j) {
        const temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
        setComparisons((prevComparisons) => prevComparisons + 1);
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
      <div
        style={{
          display: "flex",
          color: "#efefef",
          justifyContent: "space-between",
        }}
      >
        <p>Comparisons: {comparisons}</p>
        <p>Time Elapsed: {timeElapsed / 100}ms</p>
      </div>
    </div>
  );
};

export default Quicksort;
