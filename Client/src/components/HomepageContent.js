import React from "react";
import { useNavigate } from "react-router-dom";
import { navigator } from "./utils/Navigator";
import styles from "./styles/HomepageContent.module.css";

const HomepageContent=()=>{
    let navi = useNavigate(); 
    return(
        <div className={styles["whole"]}>
        <div className={styles["main-container"]}>
        <div className={styles["main-left"]}>
        THIS IS THE LEFT
        </div>
        <div className={styles["main-list"]}>
        <span className={styles["list-circle"]}></span>

        <div className={styles["button-group"]}>
        <button>About Me</button>
        <button onClick={()=>navigator(navi, "/aiplay")}>AI</button>
        <button onClick={()=>navigator(navi, "/oop")}>OOP</button> 
        <button onClick={()=>navigator(navi, "/datavis")}>Data</button>
        <button onClick={()=>navigator(navi, "/graprog")}>GP</button>
        <button onClick={()=>navigator(navi, "/algovis")}>ALGO</button>
        </div>
        </div>
        </div>
        <div className={styles["stack-outer"]}>
            <div className={styles["stack-inner"]}>
                aasdf
            </div>
        </div>
        <div className={styles["about-me"]}>
            das
        </div>
        </div>

    )
}

export default HomepageContent;
