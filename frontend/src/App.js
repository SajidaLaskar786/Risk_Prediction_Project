import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import PredictPage from "./pages/PredictPage";
import ResultPage from "./pages/ResultPage";
import AboutAnemia from "./pages/AboutAnemia";
import AboutGDM from "./pages/AboutGDM";
import HowToUse from "./pages/HowToUse";
import AboutSystem from "./pages/AboutSystem";

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

        {/* ABOUT ANEMIA */}
        <Route path="/about-anemia" element={<AboutAnemia />} />

        {/* ABOUT GDM */}
        <Route path="/about-gdm" element={<AboutGDM />} />

        {/* HOW TO USE */}
        <Route path="/how-to-use" element={<HowToUse />} />
        
        {/* HOW TO USE */}
        <Route path="/about-system" element={<AboutSystem />} />

      </Routes>

    </BrowserRouter>
  );
}

export default App;