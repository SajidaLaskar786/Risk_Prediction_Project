import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PredictPage from "./pages/PredictPage";
import ResultPage from "./pages/ResultPage";

function App() {
  return (
    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route path="/" element={<Home />} />

        {/* PREDICT */}
        <Route path="/predict" element={<PredictPage />} />

        {/* RESULT */}
        <Route path="/result" element={<ResultPage />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;