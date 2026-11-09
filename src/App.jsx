import React from "react";
import { Route, Routes } from "react-router-dom";

import Start from "./page/Start";
import Gamestart from "./page/gamestart/Gamestart";
import Snow from "./components/Snow";

import { GlobalStyle } from "./GlobalStyle";
import "./index.css";

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Snow />
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/Gamestart" element={<Gamestart />} />
      </Routes>
    </div>
  );
}

export default App;
