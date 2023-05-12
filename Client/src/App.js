import React, { Component } from "react";
import { Route, Routes} from "react-router-dom";
import Homepage from "./pages/Homepage";
import AlgorithmPage from "./pages/AlgorithmPage";
import GraphicProgrammingPage from "./pages/GraphicProgrammingPage"
import DataPage from "./pages/DataPage";
import ObjectOrientedPage from "./pages/ObjectOrientedPage"
import AIPlayGamesPage from "./pages/AIPlayGamesPage";
class App extends Component{
    render(){
        return(
            <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/algovis" element={<AlgorithmPage />} />
            <Route path="/graprog" element={<GraphicProgrammingPage />} />
            <Route path="/datavis" element={<DataPage />} />
            <Route path="/oop" element={<ObjectOrientedPage />} />
            <Route path="aiplay" element={<AIPlayGamesPage />} />
            </Routes>
        )
    }
}

export default App;
