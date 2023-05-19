import React from "react";
import { useNavigate } from "react-router-dom";
import { navigator } from "./utils/Navigator";
import styles from "./styles/HomepageContent.module.css";
import docker from "../../assets/docker.png";
import go from "../../assets/go.png";
import node from "../../assets/node.png";
import p5 from "../../assets/p5js.png";
import react from "../../assets/react.png";
import sql from "../../assets/sql.png";
const HomepageContent=()=>{
    let navi = useNavigate(); 
    
    return(
        <div className={styles["whole"]}>
        <div className={styles["main-container"]}>
        <div className={styles["main-left"]}>
            <p className={styles["main-title"]}>Welcome to <span style={{color:"#e4002b"}}>S</span><span style={{color:"#00b5e2"}}>I</span><span style={{color:"#e4002b"}}>M</span> IT Day Showcase!</p>
            <p className={styles["main-sub"]}>Immerse yourself in the realm of computer science with captivating visualizations and discover the world of combining art and technology to create interactive learning experience. Witness the power of problem-solving, bringing algorithms to life through engaging animations. Join me on this inspiring journey of discovery and witness the brilliance of the Tech-Industry</p>
           
            <p className={styles["main-me"]}>My name is <span style={{color:"#ce1c1b"}}>GIN</span><br></br>Final year student at <span style={{color:"#27449c"}}>University</span> <span style={{color:"#d51734"}}>of</span> <span style={{color:"#27449c"}}>London</span><br></br>Ex-SWE @ ST-ENGINEERING and LEXLY <br></br>Feel free to approach me for any questions!</p>
        </div>
        <div className={styles["main-list"]}>
        <div className={styles["button-group"]}>
        <button onClick={()=>navigator(navi, "/sort")}>Sorting Algorithms</button>
        <button onClick={()=>navigator(navi, "/path")}>Path Finding Algorithms</button>
        <button onClick={()=>navigator(navi, "/graphic")}>Graphical Programming</button>
        <button onClick={()=>navigator(navi, "/graphic")}>IAM and TMS</button>
        </div>
        </div>
        </div>
        <div className={styles["stack-outer"]}>
            <div className={styles["stack-inner"]}>
                <p>Powered by:</p>
                <div className={styles["imagecontainer"]}>
                <img src={react}></img>
                <img src={p5}></img>
                <img src={node}></img>
                <img src={go}></img>
                <img src={sql}></img>
                <img src={docker}></img>
                </div>
              
            </div>
        </div>
        </div>

    )
}

export default HomepageContent;
