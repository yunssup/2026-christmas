import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";

import Snow from "./components/Snow";

import { GlobalStyle } from "./GlobalStyle";
import "./index.css";

// 화면별로 따로 불러와요.
// → 팀 휴대폰은 큰 화면 코드(수익률 정답 포함)를 내려받지 않아요.
const Start = lazy(() => import("./page/Start"));
const Gamestart = lazy(() => import("./page/gamestart/Gamestart"));
const Team = lazy(() => import("./page/team/Team"));

function App() {
  return (
    <div className="App">
      <GlobalStyle />
      <Snow />
      <Suspense fallback={null}>
        <Routes>
          <Route path="/" element={<Start />} />
          <Route path="/Gamestart" element={<Gamestart />} />
          <Route path="/team" element={<Team />} />
          <Route path="/team/:teamId" element={<Team />} />
        </Routes>
      </Suspense>
    </div>
  );
}

export default App;
