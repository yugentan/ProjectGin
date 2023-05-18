import React, { useState } from "react";
import Sketch from "./AlgorithmsSketches/Sketch";
import styles from "./styles/AlgorithmContent.module.css"
import BubbleSort from "./AlgorithmsSketches/Sort.Bubble.Sketch"
import InsertionSort from "./AlgorithmsSketches/Sort.Insertion.Sketch";
import SelectionSort from "./AlgorithmsSketches/Sort.Selection.Sketch";
import MergeSort from "./AlgorithmsSketches/Sort.Merge.Sketch";
import QuickSort from "./AlgorithmsSketches/Sort.Quick.Sketch";
import RadixSort from "./AlgorithmsSketches/Sort.Radix.Sketch";
import HeapSort from "./AlgorithmsSketches/Sort.Heap.Sketch";
import DFSMaze from "./AlgorithmsSketches/Find.DFSM.Sketch";
const AlgorithmContent = () => {
  const [algoState, setAlgoState] = useState(null);
  const [arrOfInt, setArrOfInt] = useState([]);
  const [startPressed, setStartPressed] = useState(false);
  const [randomPath, setRandomPath] = useState(null);
  const handleSortClick = (e) =>{
    setAlgoState("sort");
    setStartPressed(false);
    setRandomPath(null);
    setArrOfInt(generate300RandomElements());
  }
  const handlePathClick = () =>{
    setAlgoState("path");
    setStartPressed(false);
    setRandomPath(null);
  }

  const handleSlide = (e) =>{
    let randomIntegersArray = [];
    for (let i = 0; i < e.target.value; i++) {
      let randomInteger = Math.floor(Math.random() * (400 - 10 + 1)) + 10;
      randomIntegersArray.push(randomInteger);
    }
    setArrOfInt(randomIntegersArray);
  }

  const generate300RandomElements = () =>{
    let randomIntegers = [];
    for (let i = 0; i < 300; i++) {
      let randomInteger = Math.floor(Math.random() * (400 - 10 + 1)) + 10;
      randomIntegers.push(randomInteger);
    }
    return randomIntegers;
  }
  const handleDFSM = () =>{
    setRandomPath("DFSM");
  }
  const handleEmpty = () =>{
    setRandomPath("EMPTY");
  }
  const handleStartPressed=()=>{
    setStartPressed(true);
  }
  return (
    <div className={styles["main-container"]}>
      <div className={styles["button-container"]}>
        <button className={styles["sort-button"]} onClick={handleSortClick} value={"sort"}>Sorting</button>
        <button className={styles["search-button"]} onClick={handlePathClick} value={"path"}>Path Finding</button>
      </div>
      {!startPressed && algoState === "sort"? 
      (
        <div className={styles["secondary-container"]}>
          <div className={styles["secondary-input"]}>
            <input className={styles["slider"]} type="range" min={10} max={400} defaultValue={300} onChange={handleSlide}/>
            <button className={styles["start-button"]} onClick={handleStartPressed}>Start Visualisation</button>
          </div>
          <div className={styles["ele"]}>
          <p >Array Size: {arrOfInt.length}</p>
          <p>Elements: {'{'} {arrOfInt.map((x, index) => index !== arrOfInt.length-1 ? `"${x}", ` : `"${x}"`)}  {'}'}</p>
          </div>
        </div>
      )
      : <></>}
      
      {algoState === "sort"  && startPressed ? (
      <div className={styles["sort-sketches"]}>
        <div>
          <BubbleSort intArr={arrOfInt} />
        </div>
        <div>
          <InsertionSort intArr={arrOfInt} />
        </div>
        <div>
          <SelectionSort intArr={arrOfInt} />
        </div>
        <div>
          <MergeSort intArr={arrOfInt} />
        </div>
        <div>
          <QuickSort intArr={arrOfInt} />
        </div>
        <div>
          <RadixSort intArr={arrOfInt} />
        </div>
        <div>
          <HeapSort intArr={arrOfInt} />
        </div>
        <div className={styles["wording"]}>
          <p> Worst-Case Time Complexity (Fastest to Slowest)</p>
          <p> (Fastest to Slowest)</p>
          <p> Radix Sort: O(kn)</p>
          <p> Merge Sort: O(n log n)</p>
          <p> Heap Sort: O(n log n)</p>
          <p> Quick Sort: O(n^2)</p>
          <p> Bubble Sort: O(n^2)</p>
          <p> Insertion Sort: O(n^2)</p>
          <p> Selection Sort: O(n^2)</p>
          <p> Note: The following Visualisations may not depict the most accurate measurements of the Sort Ops.</p>
          <p> # In actual fact: We most likely use some standard library sort functions IRL :D</p>
        </div>
      </div>
      ) : <></>}
      {algoState === "path" && randomPath == null ? (
      <div className={styles["secondary-input"]}>
        <button className={styles["start-button"]} onClick={handleDFSM}>Generate DFS Maze</button>
        <button className={styles["start-button"]} onClick={handleEmpty}>Generate Empty Grid</button>
      </div>
      ) : <></>}
      {algoState === "path" && randomPath == "DFSM" ? (
      <div>
        <DFSMaze />
      </div>
      ) : <></>}
      {algoState === "path" && randomPath == "EMPTY" ? (
      <div>
       E
      </div>
      ) : <></>}
    </div>
  );
};

export default AlgorithmContent;
