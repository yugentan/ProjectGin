import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";

const MergeSort = ({intArr}) => {
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
        mergeSort(values, 0, values.length - 1);
      };

      p.draw = () => {
        if(!p.checkSort(values)){
          setTimeElapsed(Date.now() - startTime);
          p.background(0);
          p.textSize(24);
          p.fill(255);
          p.text('Merge Sort', 10, 30);
          p.genRect();
        }else{
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
      async function mergeSort(arr, start, end) {
        if (start < end) {
          const mid = p.floor((start + end) / 2);
          await mergeSort(arr, start, mid);
          await mergeSort(arr, mid + 1, end);
          await merge(arr, start, mid, end);
        }
      }
      p.checkSort = (arr) => {
        for (let i = 0; i < arr.length - 1; i++) {
            if (arr[i] > arr[i + 1]) {
              return false;
            }
          }
          return true;
      }
      async function merge(arr, start, mid, end) {
        const n1 = mid - start + 1;
        const n2 = end - mid;
        const left = new Array(n1);
        const right = new Array(n2);

        for (let i = 0; i < n1; i++) {
          left[i] = arr[start + i];
        }
        for (let i = 0; i < n2; i++) {
          right[i] = arr[mid + 1 + i];
        }

        let i = 0;
        let j = 0;
        let k = start;

        while (i < n1 && j < n2) {
          if (left[i] <= right[j]) {
            arr[k] = left[i];
            i++;
            setComparisons((prevComparisons) => prevComparisons + 1);
          } else {
            arr[k] = right[j];
            j++;
            setComparisons((prevComparisons) => prevComparisons + 1);
          }
          k++;
          await sleep(0.2); 
        }

        while (i < n1) {
          arr[k] = left[i];
          setComparisons((prevComparisons) => prevComparisons + 1);
          i++;
          k++;
          await sleep(0.2); 
        }

        while (j < n2) {
          arr[k] = right[j];
          setComparisons((prevComparisons) => prevComparisons + 1);
          j++;
          k++;
          await sleep(0.2); 
        }
      }

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
      <div style={{display:"flex", color:"#efefef", justifyContent:"space-between"}}>
        <p>Comparisons: {comparisons}</p>
        <p>Time Elapsed: {timeElapsed / 100}ms</p>
      </div>
    </div>
  );
};

export default MergeSort;