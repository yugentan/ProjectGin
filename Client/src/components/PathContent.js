import React, { useState } from "react";
import styles from "./styles/AlgorithmContent.module.css"
import DFSMaze from "./AlgorithmsSketches/Find.DFSM.Sketch";
const PathContent = () => {
  const [algoState, setAlgoState] = useState("path");
  const [randomPath, setRandomPath] = useState(null);
  const handlePathClick = () =>{
    setAlgoState("path");
  }

  const handleDFSM = () =>{
    setRandomPath("DFSM");
  }
  const handleStartPressed=()=>{
    setStartPressed(true);
  }
  return (
    <div className={styles["main-container"]}>
      <div className={styles["button-container"]}>
        <button className={styles["search-button"]} onClick={handlePathClick} value={"path"}>Path Finding</button>
      </div>
      {algoState === "path" && randomPath == null ? (
      <div className={styles["secondary-input"]}>
        <button className={styles["start-button"]} onClick={handleDFSM}>Generate DFS Maze</button>
      </div>
      ) : <></>}
      {algoState === "path" && randomPath == "DFSM" ? (
      <div>
        <DFSMaze />
      </div>
      ) : <></>}
    </div>
  );
};

export default PathContent;
