import React from "react";
import SolarGraphic from "./GraphicSketches/Graph.Solor.Sketch";
import MaurerRose from "./GraphicSketches/Graph.Rose.sketch";
import styles from "./styles/GraphicContent.module.css"
import ConfettiAnimation from "./GraphicSketches/Graph.Sin.Sketch";
import BallAnimation from "./GraphicSketches/Graph.Balls.Sketch";
const GraphicContent = () => {
    return (
        <div className={styles["main2-container"]}>
          <div className={styles["sort2-sketches"]}>
            <div>
                <SolarGraphic/>
            </div>
            <div>
                <MaurerRose />
            </div>
            <div>
                <ConfettiAnimation />
            </div>
            <div>
                <BallAnimation />
            </div>
          </div>
        </div>
      );
};

export default GraphicContent;
