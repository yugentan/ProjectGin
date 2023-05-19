import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import GraphicProgrammingPage from "./pages/GraphicProgrammingPage";

import SortPage from "./pages/SortPage";
import PathPage from "./pages/PathPage";
class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/sort" element={<SortPage />} />
        <Route path="/path" element={<PathPage />} />
        <Route path="/graphic" element={<GraphicProgrammingPage />} />
      </Routes>
    );
  }
}

export default App;
