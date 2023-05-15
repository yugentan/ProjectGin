import React, { useState } from "react";

const AlgorithmContent=()=>{
    const [algorithmType, setAlgorithmType] = useState(null);

    return(
        <div>
            <div className={styles["button-group"]}>
                <button>Sort</button>
                <button>Search</button>              
                <button>Graph</button>
            </div>
            

        </div>
    )

}

export default AlgorithmContent;
