import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const RadixSort = ({ intArr }) => {
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
        radixSort(values);
      };

      p.draw = () => {
        setTimeElapsed(Date.now() - startTime);
        p.background(0);
        p.textSize(24);
        p.fill(255);
        p.text("Radix Sort", 10, 30);
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

      async function radixSort(arr) {
        const max = Math.max(...arr);

        for (let exp = 1; Math.floor(max / exp) > 0; exp *= 10) {
          await countSort(arr, exp);
        }
      }

      async function countSort(arr, exp) {
        const n = arr.length;
        const output = new Array(n).fill(0);
        const count = new Array(10).fill(0);

        for (let i = 0; i < n; i++) {
          const digit = Math.floor(arr[i] / exp) % 10;
          count[digit]++;
        }

        for (let i = 1; i < 10; i++) {
          count[i] += count[i - 1];
        }

        for (let i = n - 1; i >= 0; i--) {
          const digit = Math.floor(arr[i] / exp) % 10;
          output[count[digit] - 1] = arr[i];
          count[digit]--;
        }

        for (let i = 0; i < n; i++) {
          arr[i] = output[i];
          setComparisons((prevComparisons) => prevComparisons + 1);
          await sleep(0.2);
        }
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

export default RadixSort;
